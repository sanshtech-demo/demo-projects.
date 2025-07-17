
// Simple ToDo App Frontend using React.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('/api/todos').then(response => setTodos(response.data));
  }, []);

  const addTodo = () => {
    axios.post('/api/todos', { task: newTask }).then(response => {
      setTodos([...todos, response.data]);
      setNewTask('');
    });
  };

  const toggleTodo = id => {
    axios.put(`/api/todos/${id}`).then(response => {
      setTodos(todos.map(t => (t.id === id ? response.data : t)));
    });
  };

  return (
    <div>
      <h1>SanshTech ToDo App</h1>
      <input value={newTask} onChange={e => setNewTask(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} onClick={() => toggleTodo(todo.id)}>
            {todo.task} {todo.done ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
