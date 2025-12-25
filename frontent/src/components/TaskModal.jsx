//@ts-nocheck
import { X, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

export default function TaskModal({
  open,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setDueDate(
        initialData.dueDate ? initialData.dueDate.split("T")[0] : ""
      );
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
    }
    setErrors({});
  }, [initialData, open]);

  if (!open) return null;

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = "Task title is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      _id: initialData?._id,
      title,
      description,
      dueDate,
      completed: initialData?.completed ?? false,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {initialData ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer transition-colors hover:text-gray-600"
          >
            <X className="text-gray-400" />
          </button>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((p) => ({ ...p, title: "" }));
            }}
            placeholder="What needs to be done?"
            className={`mt-1 w-full border px-3 py-2 rounded-lg outline-none transition
              hover:border-emerald-300
              ${errors.title
                ? "border-red-500"
                : "focus:ring-2 focus:ring-emerald-400"
              }`}
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium">
            Description <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details..."
            rows={3}
            className="mt-1 w-full border px-3 py-2 rounded-lg resize-none
              outline-none transition hover:border-emerald-300"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium">
            Due Date
          </label>
          <div className="relative mt-1">
            <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="date"
              value={dueDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setDueDate(e.target.value);

              }}
              className={`w-full border pl-10 px-3 py-2 rounded-lg
                outline-none transition hover:border-emerald-300
                `}
            />
          </div>
          {errors.dueDate && (
            <p className="text-sm text-red-500 mt-1">{errors.dueDate}</p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border
              cursor-pointer transition-colors
              hover:bg-gray-100 active:scale-[0.98]"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-emerald-500 text-white
              cursor-pointer transition-all
              hover:bg-emerald-600 active:scale-[0.98]"
          >
            {initialData ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
