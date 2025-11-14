import { storage } from "./storage";
import { hashPassword } from "./auth";

async function seedAdmin() {
  console.log("Creating admin account...");
  
  const adminPassword = await hashPassword("admin123");
  
  try {
    await storage.createUser({
      username: "admin",
      password: adminPassword,
    });
    console.log("✅ Admin account created successfully");
    console.log("   Username: admin");
    console.log("   Password: admin123");
  } catch (error: any) {
    if (error.message?.includes("duplicate") || error.message?.includes("unique")) {
      console.log("ℹ️  Admin account already exists");
      console.log("   Username: admin");
      console.log("   Password: admin123");
    } else {
      console.error("❌ Error creating admin:", error);
    }
  }
  
  console.log("\nGenerating sample analytics data...");
  
  const sampleIPs = [
    "192.168.1.100",
    "10.0.0.50",
    "172.16.0.25",
    "203.0.113.42",
    "198.51.100.88",
  ];
  
  const sampleUsernames = [
    "admin",
    "user123",
    "john.doe",
    "hacker",
    "test_user",
    "alice",
    "bob",
  ];
  
  const sampleUserAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
  ];
  
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  
  try {
    for (let i = 0; i < 50; i++) {
      const isAnomaly = Math.random() < 0.15;
      const ip = isAnomaly 
        ? sampleIPs[0]
        : sampleIPs[Math.floor(Math.random() * sampleIPs.length)];
      
      const username = isAnomaly
        ? sampleUsernames[Math.floor(Math.random() * sampleUsernames.length)]
        : sampleUsernames[Math.floor(Math.random() * 3)];
      
      const success = !isAnomaly && Math.random() > 0.3;
      const riskScore = isAnomaly 
        ? 0.6 + Math.random() * 0.35
        : Math.random() * 0.4;
      
      const timestamp = new Date(now - Math.random() * oneDay * 2);
      
      await storage.createLoginAttempt({
        username,
        ipAddress: ip,
        userAgent: sampleUserAgents[Math.floor(Math.random() * sampleUserAgents.length)],
        location: "Sample Location",
        riskScore,
        success,
        blocked: riskScore > 0.7,
      });
    }
    
    console.log("✅ Generated 50 sample login attempts");
    console.log("   • Mix of successful and failed logins");
    console.log("   • Some high-risk anomalies included");
    console.log("   • Data spread over last 48 hours");
  } catch (error) {
    console.error("❌ Error generating sample data:", error);
  }
  
  console.log("\n🎉 Setup complete! You can now login with:");
  console.log("   Username: admin");
  console.log("   Password: admin123");
  
  process.exit(0);
}

seedAdmin().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
