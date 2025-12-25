//@ts-nocheck
import { ClipboardList } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-gray-400 mt-20">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <ClipboardList size={32} className="text-gray-400" />
      </div>
      <p className="font-medium">No tasks yet</p>
      <p className="text-sm">Add a task to get started</p>
    </div>
  );
}
