import LoginForm from "../LoginForm";

export default function LoginFormExample() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <LoginForm 
        showRiskIndicator={true}
        riskScore={0.25}
        onSubmit={(username, password) => {
          console.log("Login submitted:", { username, password });
        }}
      />
    </div>
  );
}
