const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: '../.env' });

const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', userRoutes);
app.use('/api', studentRoutes);
app.use('/api', fileRoutes);

app.get('/', (req, res) => {
  res.json({ message: '学生信息管理系统 API 服务运行中' });
});

app.listen(PORT, () => {
  console.log(`后端服务已启动: http://localhost:${PORT}`);
});

module.exports = app;
