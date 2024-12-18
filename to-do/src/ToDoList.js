import { useEffect, useState } from "react";
import './Todolist.css'; // Importing the CSS file

export default function ToDoList() {
    // Retrieve tasks from localStorage
    function getStoredTodos() {
        let data = localStorage.getItem("todos");
        let json = JSON.parse(data);
        return json ? json : [];
    }

    const [todos, setTodos] = useState(getStoredTodos());
    const [filter, setFilter] = useState("all"); // Filter state (all, completed, pending)

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // Submit handler
    function handleSubmit(event) {
        event.preventDefault();
        let task = event.target.task.value;

        if (task.trim() === "") {
            alert("Task cannot be empty!");
            return;
        }

        setTodos([...todos, { task: task, completed: false }]);
        event.target.reset();
    }

    // Change task completion status
    function changeTaskStatus(index) {
        let newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    }

    // Delete a task
    function deleteTask(index) {
        let newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    // Filtered tasks based on the selected filter
    const filteredTodos = todos.filter(todo => {
        if (filter === "completed") return todo.completed;
        if (filter === "pending") return !todo.completed;
        return true; // For "all" tasks
    });

    return (
        <div className="page-background">
            <div className="container">
                {/* Header Section */}
                <div className="header-section d-flex align-items-center mb-4">
                    <img
                        src="imgg.jpeg"  // Replace with your image path
                        alt="Company Logo"
                        className="logo"
                    />
                    <h1>My To-Do List</h1>
                </div>

                {/* Form */}
                <form className="d-flex mb-4" onSubmit={handleSubmit}>
                    <input
                        className="form-control"
                        placeholder="Enter a new task"
                        name="task"
                    />
                    <button type="submit">Add</button>
                </form>

                {/* Filters */}
                <div className="filter-buttons d-flex justify-content-center mb-3">
                    <button
                        className={filter === "all" ? "active" : ""}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </button>
                    <button
                        className={filter === "completed" ? "active" : ""}
                        onClick={() => setFilter("completed")}
                    >
                        Completed
                    </button>
                    <button
                        className={filter === "pending" ? "active" : ""}
                        onClick={() => setFilter("pending")}
                    >
                        Pending
                    </button>
                </div>

                {/* Task List */}
                {filteredTodos.length > 0 ? (
                    filteredTodos.map((todo, index) => (
                        <div
                            key={index}
                            className={`todo-item d-flex justify-content-between align-items-center ${todo.completed ? "completed" : ""
                                }`}
                        >
                            <span>{todo.task}</span>
                            <div>
                                <i
                                    className={`bi ${todo.completed
                                            ? "bi-check-circle-fill text-success"
                                            : "bi-circle text-secondary"
                                        }`}
                                    onClick={() => changeTaskStatus(index)}
                                ></i>
                                <i
                                    className="bi bi-trash text-danger"
                                    onClick={() => deleteTask(index)}
                                ></i>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted">No tasks found.</p>
                )}
            </div>
        </div>
    );
}
