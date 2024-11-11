import { useState } from "react";
import "./ToDoList.css";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function checkTask(event) {
    event.target.nextElementSibling.classList.toggle("completed-task");
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
                onChange={checkTask}
              />
              <span className="text">{task}</span>
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
