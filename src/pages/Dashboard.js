import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { TaskForm } from "../components/TaskForm";
import { Task } from "../components/Task";
import { API_URL } from "../config/global";
export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/todo`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error during fetchTasks:", error);
    }
  };
  const addTask = () => {
    fetchTasks();
  };
  const updateTask = async (id, taskTitle) => {
    try {
      const responce = await axios.put(`${API_URL}/todo/${id}`, {
        title: taskTitle,
      });
      if (responce.data) {
        fetchTasks();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error during updateTask:", error);
      alert("something went wrong.Try again.");
    }
  };
  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/todo/${id}`);
      if (response.data) {
        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.error("Error during deleteTask:", error);
      alert("something went wrong. Try again.");
    }
  };
  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <h1>
          Todo&ndsp;<span>app </span>
        </h1>
        <TaskForm addTask={addTask} />
      </div>
      <div className="task-list">
        {task.length ? (
          tasks
            .slice()
            .reverse()
            .map((task) => {
              <Task
                key={task._id}
                task={task.title}
                updateTask={(taskTitle) => updateTask(task._id, taskTitle)}
                deleteTask={() => deleteTask(task._id)}
              />;
            })
        ) : (
          <p>All tasks are complete well done!</p>
        )}
      </div>
    </div>
  );
}
