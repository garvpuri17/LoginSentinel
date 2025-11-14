import RiskScoreGauge from "../RiskScoreGauge";

export default function RiskScoreGaugeExample() {
  return (
    <div className="p-6 bg-background max-w-md">
      <RiskScoreGauge score={0.35} />
    </div>
  );
}
