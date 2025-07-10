const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [
  { id: 1, description: "Learn Express.js" },
  { id: 2, description: "Build a ToDo App" },
  { id: 3, description: "Test with Postman" },
];
let currentId = 4;

app.get("/", (req, res) => {
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
          ${todos
            .map(
              (todo) =>
                `<li><strong>#${todo.id}</strong> - ${todo.description}</li>`
            )
            .join("")}
        </ul>
        <p>You can use <strong>Postman</strong> to test the <code>POST</code>, <code>PUT</code>, and <code>PATCH</code> requests at <code>/todos</code>.</p>

<p>To view, search, or sort todos, simply use your <strong>browser</strong>:</p>
<ul>
  <li><strong>View all:</strong> <code>/todos</code></li>
  <li><strong>Search:</strong> <code>/todos/search?q=your_keyword</code></li>
  <li><strong>Sort by ID:</strong> <code>/todos/sort?k=asc</code> or <code>k=desc</code></li>
  <li><strong>Sort by Description:</strong> <code>/todos/sort/description?k=asc</code> or <code>k=desc</code></li>
</ul>

      </body>
    </html>
  `;
  res.send(html);
});

//  Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

//  Create new todo
app.post("/todos", (req, res) => {
  const { description } = req.body;
  if (!description)
    return res.status(400).json({ error: "Description is required" });

  const newTodo = { id: currentId++, description };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

//  Update entire todo
app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const { description } = req.body;

  const todo = todos.find((t) => t.id === todoId);
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  if (!description)
    return res.status(400).json({ error: "Description is required" });

  todo.description = description;
  res.json(todo);
});

//  Partial update
app.patch("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const { description } = req.body;

  const todo = todos.find((t) => t.id === todoId);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  if (description !== undefined) {
    todo.description = description;
  }

  res.json(todo);
});

//  SORTING API
// /todos/sort?order=asc or desc
app.get("/todos/sort", (req, res) => {
  const validOrders = ["asc", "desc"];
  const order = req.query.k;

  if (!validOrders.includes(order)) {
    return res.status(400).json({
      error: "Invalid or missing query param 'k'. Use ?k=asc or ?k=desc",
    });
  }

  const sortedTodos = [...todos].sort((a, b) =>
    order === "asc" ? a.id - b.id : b.id - a.id
  );
  res.json(sortedTodos);
});

// Sort by description (A-Z or Z-A)
app.get("/todos/sort/description", (req, res) => {
  const order = req.query.k === "desc" ? "desc" : "asc";
  const sortedTodos = [...todos].sort((a, b) => {
    const textA = a.description.toLowerCase();
    const textB = b.description.toLowerCase();
    if (textA < textB) return order === "asc" ? -1 : 1;
    if (textA > textB) return order === "asc" ? 1 : -1;
    return 0;
  });
  res.json(sortedTodos);
});

//  SEARCH API
// /todos/search?q=keyword
app.get("/todos/search", (req, res) => {
  // const keyword = req.query.q?.toLowerCase();
  const keyword = req.query.q ? req.query.q.toLowerCase() : "";

  if (!keyword) {
    return res
      .status(400)
      .json({ error: "Search query is required using ?q=keyword" });
  }

  const filtered = todos.filter((todo) =>
    todo.description.toLowerCase().includes(keyword)
  );
  if (filtered.length === 0) {
    res.status(404).json({ message: "No todos found for your search query." });
  } else {
    res.json(filtered);
  }
});

//  Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
