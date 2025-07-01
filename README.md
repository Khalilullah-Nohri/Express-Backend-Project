# Student Portal Backend

This is a Node.js and Express-based REST API for managing student records. It supports fetching all students and adding new ones via JSON API requests.

## 🚀 How to Run

```bash
# Clone the repo
git clone https://github.com/your-username/student-portal-backend.git
cd student-portal-backend

# Install dependcies
npm install
npm init -y
npm install express

# Run the server
node index.js
```

## 🔌 API Endpoints

### `GET /api/students`
Returns all student records.

### `POST /api/students`
Adds a new student.

**Request Body:**
```json
{
  "name": "Zara Butt",
  "course": "Physics"
}
```

## 🧾 Example Response

```json
[
  { "id": 1, "name": "Ali Khan", "course": "Computer Science" },
  { "id": 2, "name": "Sara Ahmed", "course": "Mathematics" }
]
```

## 🌐 Home Route

Visit [`/`](http://localhost:3000/) to see how to use the API.

---

## 📦 Tech Stack

- Node.js
- Express.js

## 📄 License

MIT
