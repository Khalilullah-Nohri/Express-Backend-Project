
# 📝 Express.js Todo App

A simple and beginner-friendly Todo application built with Node.js and Express. It supports all basic RESTful operations and displays todos in a browser using plain HTML. You can also test it using Postman.

---

## 🚀 Features

- View todos in browser with basic HTML UI
- Add new todos (`POST`)
- Update todos (`PUT` for full update, `PATCH` for partial)
- Sort todos by ID (`asc` or `desc`)
- Search todos by description
- Test API using Postman

---

## 📦 Requirements

- Node.js (v14 or later)
- Postman (or any REST client)

---

## 📁 Project Structure

```
project-folder/
├── node_modules    # Contains `npm install express` commands modules
├── index.js        # Main server file
├── package.json        # Contains `npm init -y` files , complete structure of project
└── README.md       # You're reading it 🙂
```

---

## 🛠️ Setup Instructions

1. **Clone the repo / Copy the files**

2. **Install dependencies**
```bash
npm init -y
npm install express
```

3. **Run the server**
```bash
node todoApp.js
```

4. **Open in browser**
```
http://localhost:3000/
```

---

## 📬 API Endpoints

### 🔹 GET all todos
```http
GET /todos
```

---

### 🔹 POST create new todo
```http
POST /todos
Content-Type: application/json

{
  "description": "Buy groceries"
}
```

---

### 🔹 PUT update entire todo
```http
PUT /todos/:id
Content-Type: application/json

{
  "description": "Updated todo"
}
```

---

### 🔹 PATCH partial update
```http
PATCH /todos/:id
Content-Type: application/json

{
  "description": "New title only"
}
```

---

### 🔹 GET sorted todos By ID
```http
GET /todos/sort?k=asc     // ascending
GET /todos/sort?k=desc    // descending
```
---

### 🔹 GET sorted todos By description
```http
GET /todos/sort/description?k=asc     // ascending
GET /todos/sort/description?k=desc    // descending
```
---

### 🔹 GET search todos
```http
GET /todos/search?q=learn
```

---

## 📺 Browser View

Visit:

```
http://localhost:3000/
```

You'll see a basic list of todos rendered using raw HTML.

---

## 🙌 Contributing

This is a basic practice project. Feel free to fork, clone, and build on top of it!

---

## 📃 License

MIT — use freely for learning or building personal projects.
