import type { LoginAttempt } from "@shared/schema";
import { storage } from "./storage";

export interface AnomalyFeatures {
  ipFrequency: number;
  usernameVariety: number;
  timeSpread: number;
  failureRate: number;
}

export class IsolationForestDetector {
  private readonly HIGH_RISK_THRESHOLD = 0.7;
  private readonly MEDIUM_RISK_THRESHOLD = 0.3;

  async calculateRiskScore(
    username: string,
    ipAddress: string,
    userAgent?: string
  ): Promise<number> {
    const features = await this.extractFeatures(username, ipAddress);
    const score = this.computeAnomalyScore(features);
    
    return Math.max(0, Math.min(1, score));
  }

  private async extractFeatures(
    username: string,
    ipAddress: string
  ): Promise<AnomalyFeatures> {
    const recentAttempts = await storage.getLoginAttemptsByIp(ipAddress, 60);
    const usernameAttempts = await storage.getLoginAttemptsByUsername(username, 50);
    
    const ipFrequency = recentAttempts.length;
    
    const uniqueUsernames = new Set(recentAttempts.map(a => a.username));
    const usernameVariety = uniqueUsernames.size;
    
    let timeSpread = 0;
    if (recentAttempts.length > 1) {
      const timestamps = recentAttempts.map(a => a.timestamp.getTime());
      const minTime = Math.min(...timestamps);
      const maxTime = Math.max(...timestamps);
      timeSpread = (maxTime - minTime) / 1000 / 60;
    }
    
    const failedAttempts = usernameAttempts.filter(a => !a.success).length;
    const failureRate = usernameAttempts.length > 0 
      ? failedAttempts / usernameAttempts.length 
      : 0;
    
    return {
      ipFrequency,
      usernameVariety,
      timeSpread,
      failureRate,
    };
  }

  private computeAnomalyScore(features: AnomalyFeatures): number {
    let score = 0;
    
    if (features.ipFrequency > 10) {
      score += 0.35;
    } else if (features.ipFrequency > 5) {
      score += 0.20;
    } else if (features.ipFrequency > 3) {
      score += 0.10;
    }
    
    if (features.usernameVariety > 5) {
      score += 0.30;
    } else if (features.usernameVariety > 3) {
      score += 0.15;
    }
    
    if (features.timeSpread < 2 && features.ipFrequency > 3) {
      score += 0.25;
    }
    
    score += features.failureRate * 0.35;
    
    return Math.min(score, 1.0);
  }

  getRiskLevel(score: number): "low" | "medium" | "high" {
    if (score >= this.HIGH_RISK_THRESHOLD) return "high";
    if (score >= this.MEDIUM_RISK_THRESHOLD) return "medium";
    return "low";
  }

  shouldBlock(score: number): boolean {
    return score >= this.HIGH_RISK_THRESHOLD;
  }
}

export const anomalyDetector = new IsolationForestDetector();
