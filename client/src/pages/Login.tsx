import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [riskScore, setRiskScore] = useState<number | undefined>(undefined);
  const [attemptCount, setAttemptCount] = useState(0);

  if (isAuthenticated) {
    setLocation("/");
  }

  const handleLogin = async (username: string, password: string) => {
    console.log("Login attempt:", { username, password });
    setAttemptCount(prev => prev + 1);
    
    const result = await login(username, password);
    
    if (result.success) {
      toast({
        title: "Login successful",
        description: `Risk score: ${((result.riskScore || 0) * 100).toFixed(1)}%`,
      });
      setLocation("/");
    } else {
      setRiskScore(result.riskScore);
      toast({
        title: "Login failed",
        description: result.error || "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <LoginForm
        onSubmit={handleLogin}
        showRiskIndicator={attemptCount > 0}
        riskScore={riskScore}
      />
    </div>
  );
}
