import { type User, type InsertUser, type LoginAttempt, type InsertLoginAttempt, users, loginAttempts } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createLoginAttempt(attempt: InsertLoginAttempt): Promise<LoginAttempt>;
  getLoginAttempts(limit?: number): Promise<LoginAttempt[]>;
  getLoginAttemptsByUsername(username: string, limit?: number): Promise<LoginAttempt[]>;
  getLoginAttemptsByIp(ipAddress: string, timeWindowMinutes?: number): Promise<LoginAttempt[]>;
  getRecentLoginAttempts(timeWindowMinutes: number): Promise<LoginAttempt[]>;
  getAnomalyStats(): Promise<{
    total: number;
    detected: number;
    detectionRate: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createLoginAttempt(attempt: InsertLoginAttempt): Promise<LoginAttempt> {
    const result = await db.insert(loginAttempts).values(attempt).returning();
    return result[0];
  }

  async getLoginAttempts(limit: number = 100): Promise<LoginAttempt[]> {
    return await db.select().from(loginAttempts).orderBy(desc(loginAttempts.timestamp)).limit(limit);
  }

  async getLoginAttemptsByUsername(username: string, limit: number = 100): Promise<LoginAttempt[]> {
    return await db.select()
      .from(loginAttempts)
      .where(eq(loginAttempts.username, username))
      .orderBy(desc(loginAttempts.timestamp))
      .limit(limit);
  }

  async getLoginAttemptsByIp(ipAddress: string, timeWindowMinutes: number = 60): Promise<LoginAttempt[]> {
    const timeThreshold = new Date(Date.now() - timeWindowMinutes * 60 * 1000);
    return await db.select()
      .from(loginAttempts)
      .where(
        and(
          eq(loginAttempts.ipAddress, ipAddress),
          gte(loginAttempts.timestamp, timeThreshold)
        )
      )
      .orderBy(desc(loginAttempts.timestamp));
  }

  async getRecentLoginAttempts(timeWindowMinutes: number): Promise<LoginAttempt[]> {
    const timeThreshold = new Date(Date.now() - timeWindowMinutes * 60 * 1000);
    return await db.select()
      .from(loginAttempts)
      .where(gte(loginAttempts.timestamp, timeThreshold))
      .orderBy(desc(loginAttempts.timestamp));
  }

  async getAnomalyStats(): Promise<{
    total: number;
    detected: number;
    detectionRate: number;
  }> {
    const highRiskThreshold = 0.7;
    
    const totalResult = await db.select({ count: sql<number>`count(*)::int` })
      .from(loginAttempts)
      .where(eq(loginAttempts.success, false));
    
    const detectedResult = await db.select({ count: sql<number>`count(*)::int` })
      .from(loginAttempts)
      .where(
        and(
          eq(loginAttempts.success, false),
          gte(loginAttempts.riskScore, highRiskThreshold)
        )
      );
    
    const total = totalResult[0]?.count || 0;
    const detected = detectedResult[0]?.count || 0;
    const detectionRate = total > 0 ? (detected / total) * 100 : 0;
    
    return { total, detected, detectionRate };
  }
}

export const storage = new DatabaseStorage();
