const pool = require('../config/database');

const getAllStudents = async () => {
  const [rows] = await pool.execute('SELECT * FROM students ORDER BY id');
  return rows;
};

const getStudentsByFilters = async (filters) => {
  let sql = 'SELECT * FROM students WHERE 1=1';
  const params = [];

  if (filters.student_no) {
    sql += ' AND student_no LIKE ?';
    params.push(`%${filters.student_no}%`);
  }
  if (filters.name) {
    sql += ' AND name LIKE ?';
    params.push(`%${filters.name}%`);
  }
  if (filters.class) {
    sql += ' AND class = ?';
    params.push(filters.class);
  }

  sql += ' ORDER BY id';
  const [rows] = await pool.execute(sql, params);
  return rows;
};

const getStudentById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM students WHERE id = ?', [id]);
  return rows[0] || null;
};

const createStudent = async (data) => {
  const { student_no, name, gender, class: className, score, contact } = data;
  const [result] = await pool.execute(
    'INSERT INTO students (student_no, name, gender, class, score, contact) VALUES (?, ?, ?, ?, ?, ?)',
    [student_no, name, gender, className, score || 0, contact]
  );
  return result.insertId;
};

const updateStudent = async (id, data) => {
  const { student_no, name, gender, class: className, score, contact } = data;
  await pool.execute(
    'UPDATE students SET student_no = ?, name = ?, gender = ?, class = ?, score = ?, contact = ? WHERE id = ?',
    [student_no, name, gender, className, score, contact, id]
  );
  return true;
};

const deleteStudent = async (id) => {
  await pool.execute('DELETE FROM students WHERE id = ?', [id]);
  return true;
};

const getStudentCountByClass = async () => {
  const [rows] = await pool.execute(
    'SELECT class, COUNT(*) as count FROM students GROUP BY class ORDER BY class'
  );
  return rows;
};

const getTotalStudentCount = async () => {
  const [rows] = await pool.execute('SELECT COUNT(*) as total FROM students');
  return rows[0].total;
};

const getClassCount = async () => {
  const [rows] = await pool.execute('SELECT COUNT(DISTINCT class) as total FROM students');
  return rows[0].total;
};

module.exports = {
  getAllStudents,
  getStudentsByFilters,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentCountByClass,
  getTotalStudentCount,
  getClassCount
};
