//@ts-nocheck
export default function ProgressCard({ total, completed }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Progress</span>
        <span className="text-emerald-500 font-semibold">{percent}%</span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl font-bold">{completed}</span>
        <span className="text-gray-400">/ {total}</span>
      </div>

      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
