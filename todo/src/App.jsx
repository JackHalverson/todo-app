import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos on component mount
  useEffect(() => {
    axios.get('http://localhost:8000/')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Add a new todo
  const addTodo = () => {
    axios.post('http://localhost:8000/', { number: todos.length + 1, description: newTodo })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo("");  // Clear input after submission
      })
      .catch(error => console.error('Error adding todo:', error));
  };
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:8000/${id}`)
      .then(response => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => console.error('Error deleting todo:', error));
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <div className="todo-number">{todo.number}.</div>
            {todo.description}
            <button onClick={() => deleteTodo(todo.id)} className="delete-todo-button">Delete</button>
          </div>
        ))}
      </div>
      <div className="add-todo">
        <input
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo} className="add-todo-button">Add Todo</button>
      </div>
    </div>
  );
};

export default TodoApp;