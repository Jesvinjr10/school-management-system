require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Routes
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const marksRoutes = require('./routes/marksRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/marks', marksRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
