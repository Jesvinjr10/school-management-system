const express = require('express');
const cors = require('cors');
const app = express();

const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const marksRoutes = require('./routes/marksRoutes');

app.use(cors());
app.use(express.json());

app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/marks', marksRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});