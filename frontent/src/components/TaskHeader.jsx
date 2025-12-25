//@ts-nocheck
import { Plus, ListTodo } from "lucide-react";

export default function TaskHeader({ onOpen }) {
  return (
    <div className="mt-10 flex justify-between items-center">
      <div className="flex items-center gap-2 text-xl font-semibold">
        <ListTodo size={20} className="text-emerald-500" />
        My Tasks
      </div>

      <button
        onClick={onOpen}
        className="
          flex items-center gap-2
          bg-emerald-500 text-white
          px-5 py-2 rounded-lg
          cursor-pointer
          transition-colors duration-200
          hover:bg-emerald-600
          active:scale-[0.98]
        "
      >
        <Plus size={16} />
        Add Task
      </button>
    </div>
  );
}
