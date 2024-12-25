import { useState, useEffect } from "react";
import "./ToDoList.css";

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("todoTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { text: newTask, checked: false },
      ]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function checkTask(index) {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, checked: !task.checked } : task
      )
    );
  }

  return (
    <div className="container">
      <h1>To-do List</h1>

      <div className="input">
        <input
          type="text"
          placeholder="Add new task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="submit-btn" onClick={addTask}>
          Add
        </button>
      </div>

      <div className="output">
        <ul>
          {tasks.map((task, index) => (
            <li className="todo-task" key={index}>
              <input
                type="checkbox"
                className="checkbox"
                checked={task.checked}
                onChange={() => checkTask(index)}
              />
              <span className={`text ${task.checked ? "completed-task" : ""}`}>
                {task.text}
              </span>
              <button className="delete-btn" onClick={() => deleteTask(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
