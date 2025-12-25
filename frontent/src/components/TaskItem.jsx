//@ts-nocheck
import { Trash2, Calendar, Pencil, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await onDelete(task._id);
      setConfirmOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex justify-between items-center hover:shadow-sm transition">

        <div className="flex items-start gap-4">
          <button
            onClick={() => onToggle(task._id)}
            className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer
              ${
                task.completed
                  ? "border-emerald-500 bg-emerald-500"
                  : "border-gray-300 hover:border-emerald-400"
              }`}
            title="Toggle complete"
          >
            {task.completed && (
              <CheckCircle size={14} className="text-white" />
            )}
          </button>

          <div>
            <p
              className={`font-medium ${
                task.completed
                  ? "line-through text-gray-400"
                  : "text-gray-900"
              }`}
            >
              {task.title}
            </p>

            {task.description && (
              <p className="text-sm text-gray-400 mt-0.5">
                {task.description}
              </p>
            )}

            <div className="flex items-center gap-3 mt-2">
              {task.dueDate && (
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar size={14} />
                  {new Date(task.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}

              {task.completed && (
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle size={12} />
                  Completed
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!task.completed && (
            <button
              onClick={() => onEdit(task)}
              className="text-gray-400 hover:text-emerald-500 transition cursor-pointer"
              title="Edit task"
            >
              <Pencil size={18} />
            </button>
          )}

          <button
            onClick={() => setConfirmOpen(true)}
            className="text-gray-400 hover:text-red-500 transition cursor-pointer"
            title="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 h-screen">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">

            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Task
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">"{task.title}"</span>?  
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                disabled={deleting}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700
                hover:bg-gray-100 cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-600 text-white
                hover:bg-red-700 cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
