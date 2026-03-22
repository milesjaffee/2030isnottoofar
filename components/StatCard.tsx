import { Card, CardContent } from "@/components/ui/card";
import AnimatedNumbers from "react-animated-numbers";

export default function StatCard({ label, value }: { label: string; value: any }) {
  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardContent className="p-6">
        {isNaN(value as number)?
          <div className="text-3xl font-medium text-neutral-200">{value}</div> :
          <AnimatedNumbers fontStyle={{fontSize: "1.875rem", fontWeight: "500", color: "#e5e5e5" }}
        animateToNumber={value}
        transitions={(index) => ({
          type: "spring",
          duration: index,
        })}
      />
        }
        <div className="text-neutral-400 mt-1">{label}</div>
      </CardContent>
    </Card>
  );
}