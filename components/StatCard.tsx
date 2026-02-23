import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardContent className="p-6">
        <div className="text-3xl font-medium text-neutral-200">{value}</div>
        <div className="text-neutral-400 mt-1">{label}</div>
      </CardContent>
    </Card>
  );
}