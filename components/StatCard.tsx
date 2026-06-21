type StatCardProps = {
  label: string;
  value: string | number;
  tone?: "green" | "yellow" | "coral";
};

const toneClass = {
  green: "bg-mint text-leaf",
  yellow: "bg-amber-50 text-amber-700",
  coral: "bg-rose-50 text-coral",
};

export function StatCard({ label, value, tone = "green" }: StatCardProps) {
  return (
    <div className={`rounded-lg p-4 ${toneClass[tone]}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </div>
  );
}
