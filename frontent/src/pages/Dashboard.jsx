//@ts-nocheck
import { useEffect, useState } from "react";
import api from "../api/axios";

import Navbar from "../components/Navbar";
import ProgressCard from "../components/ProgressCard";
import TaskHeader from "../components/TaskHeader";
import TaskTabs from "../components/TaskTabs";
import TaskList from "../components/TaskList";
import EmptyState from "../components/EmptyState";
import TaskModal from "../components/TaskModal";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch tasks error", err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      const res = await api.post("/tasks", task);
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error("Create task error", err);
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, task);
      setTasks(tasks.map(t => t._id === task._id ? res.data : t));
      setEditingTask(null);
    } catch (err) {
      console.error("Update task error", err);
    }
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t._id === id);
    try {
      const res = await api.put(`/tasks/${id}`, {
        ...task,
        completed: !task.completed,
      });
      setTasks(tasks.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.error("Toggle task error", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error("Delete task error", err);
    }
  };

  const editTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;

  const filteredTasks =
    filter === "All"
      ? tasks
      : filter === "Completed"
        ? tasks.filter(t => t.completed)
        : tasks.filter(t => !t.completed);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="max-w-3xl mx-auto px-6 py-6">

        <h2 className="text-3xl font-bold mt-10">
          Hello, {user.name}!
        </h2>
        <p className="text-gray-500">
          Here's what you need to get done today.
        </p>

        <ProgressCard total={tasks.length} completed={completed} />

        <TaskHeader onOpen={() => setModalOpen(true)} />

        <TaskModal
          open={modalOpen || !!editingTask}
          initialData={editingTask}
          onClose={() => {
            setModalOpen(false);
            setEditingTask(null);
          }}
          onSubmit={editingTask ? updateTask : addTask}
        />

        <TaskTabs
          filter={filter}
          setFilter={setFilter}
          counts={{
            All: tasks.length,
            Pending: pending,
            Completed: completed,
          }}
        />

        {loading ? (
          <p className="text-center text-gray-400 mt-10">Loading...</p>
        ) : filteredTasks.length ? (
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
