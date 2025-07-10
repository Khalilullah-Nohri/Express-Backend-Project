// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Dummy student data
let students = [
  { id: 1, name: 'Ali Khan', course: 'Computer Science' },
  { id: 2, name: 'Sara Ahmed', course: 'Mathematics' }
];

// Routes

// Home route with usage instructions
app.get('/', (req, res) => {
  res.send(`
    <h1>🎓 Welcome to the Student Portal API</h1>
    <p>To access student data, use the following API route:</p>
    <pre><code>GET /api/students</code></pre>
    <p>To add a student, send a <code>POST</code> request to:</p>
    <pre><code>POST /api/students</code></pre>
    <p>With JSON body like:</p>
    <pre><code>{
  "name": "Zara Butt",
  "course": "Physics"
}</code></pre>
  `);
});

// Get all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

// Add a new student
app.post('/api/students', (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({ error: 'Name and course are required' });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    course
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


// const express = require('express');
// const axios = require('axios');
// const app = express();

// app.get('/get-ads-json', async (req, res) => {
//   try {
//     const response = await axios.get('https://www.khilari.com.pk/scores'); // full URL here

//     // Return the data as JSON
//     res.json({
//       success: true,
//       data: response.data
//     });

//   } catch (error) {
//     console.error('Fetch error:', error.message);

//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch data',
//       error: error.message
//     });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server running at http://localhost:3000');
// });


// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;
// // Middleware
// app.use(express.json());
// // Basic route'
// const apiPath = "/api/users"
// app.get(apiPath, (req, res) => {
//   res.json({ 
//     name: 'Anas',
//     email: 'alihasnain@gmail.com',
//     age: 20,
//     city: 'Karachi',
//     country: 'Pakistan'
//   });
// });

// const myJson = "/json-api";
// const data = [
//   {
//     id: 1,
//     name: 'Anas',
//     email: 'anas@gmail.com',
//   },
//   {
//     id: 2,
//     name: 'Ali',
//     email: 'ali@gmail.com',
//   },
//   {
//     id: 3,
//     name: 'Ahmed',
//     email: 'ahmed@gmail.com',
//   }
// ]
// app.get(myJson, (req, res) => {
//   res.json(
//   {
//     message: "Users retrieved successfully",
//     myUsers: data
//   }
//   );
// });
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });
// module.exports = app; 