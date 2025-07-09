const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());


let todos = [
  { id: 1, description: 'Learn Express.js' },
  { id: 2, description: 'Build a ToDo App' },
  { id: 3, description: 'Test with Postman' }
];
let currentId = 4;


app.get('/', (req, res) => {
  const html = `
    <html>
      <head>
        <title>Todo List</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          h1 { color: #333; }
          ul { line-height: 1.6; }
          li { margin-bottom: 5px; }
        </style>
      </head>
      <body>
        <h1>Todo List</h1>
        <ul>
          ${todos.map(todo => `<li><strong>#${todo.id}</strong> - ${todo.description}</li>`).join('')}
        </ul>
        <p>Use Postman for POST, PUT, PATCH at <code>/todos</code></p>
      </body>
    </html>
  `;
  res.send(html);
});

//  Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

//  Create new todo
app.post('/todos', (req, res) => {
  const { description } = req.body;
  if (!description) return res.status(400).json({ error: 'Description is required' });

  const newTodo = { id: currentId++, description };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

//  Update entire todo
app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const { description } = req.body;

  const todo = todos.find(t => t.id === todoId);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  if (!description) return res.status(400).json({ error: 'Description is required' });

  todo.description = description;
  res.json(todo);
});

//  Partial update
app.patch('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const { description } = req.body;

  const todo = todos.find(t => t.id === todoId);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });

  if (description !== undefined) {
    todo.description = description;
  }

  res.json(todo);
});


//  SORTING API
// /todos/sort?order=asc or desc
app.get('/todos/sort', (req, res) => {
  const order = req.query.order === 'desc' ? 'desc' : 'asc'; // default to 'asc'

  const sortedTodos = [...todos].sort((a, b) => {
    return order === 'asc' ? a.id - b.id : b.id - a.id;
  });

  res.json(sortedTodos);
});

//  SEARCH API
// /todos/search?q=keyword
app.get('/todos/search', (req, res) => {
  const keyword = req.query.q?.toLowerCase();

  if (!keyword) {
    return res.status(400).json({ error: 'Search query is required using ?q=keyword' });
  }

  const filtered = todos.filter(todo =>
    todo.description.toLowerCase().includes(keyword)
  );

  res.json(filtered);
});


//  Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
