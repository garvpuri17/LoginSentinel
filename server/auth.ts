import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { User } from "@shared/schema";

const JWT_SECRET = process.env.SESSION_SECRET || "development-secret-change-in-production";
const SALT_ROUNDS = 10;

export interface TokenPayload {
  userId: string;
  username: string;
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function generateToken(user: User): string {
  const payload: TokenPayload = {
    userId: user.id,
    username: user.username,
  };
  
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "24h",
  });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
