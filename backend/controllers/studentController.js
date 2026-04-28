const studentModel = require('../models/studentModel');

const getAllStudents = async (req, res) => {
  try {
    const students = await studentModel.getAllStudents();
    res.json({ code: 200, data: students });
  } catch (error) {
    res.status(500).json({ code: 500, message: '获取学生列表失败', error: error.message });
  }
};

const searchStudents = async (req, res) => {
  try {
    const filters = req.query;
    const students = await studentModel.getStudentsByFilters(filters);
    res.json({ code: 200, data: students });
  } catch (error) {
    res.status(500).json({ code: 500, message: '查询学生失败', error: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await studentModel.getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({ code: 404, message: '学生不存在' });
    }
    res.json({ code: 200, data: student });
  } catch (error) {
    res.status(500).json({ code: 500, message: '获取学生信息失败', error: error.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const id = await studentModel.createStudent(req.body);
    res.json({ code: 200, message: '添加成功', data: { id } });
  } catch (error) {
    res.status(500).json({ code: 500, message: '添加学生失败', error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    await studentModel.updateStudent(req.params.id, req.body);
    res.json({ code: 200, message: '更新成功' });
  } catch (error) {
    res.status(500).json({ code: 500, message: '更新学生失败', error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    await studentModel.deleteStudent(req.params.id);
    res.json({ code: 200, message: '删除成功' });
  } catch (error) {
    res.status(500).json({ code: 500, message: '删除学生失败', error: error.message });
  }
};

const getDashboardData = async (req, res) => {
  try {
    const totalStudents = await studentModel.getTotalStudentCount();
    const classCount = await studentModel.getClassCount();
    const classDistribution = await studentModel.getStudentCountByClass();

    res.json({
      code: 200,
      data: {
        totalStudents,
        classCount,
        todayNew: 0,
        classDistribution
      }
    });
  } catch (error) {
    res.status(500).json({ code: 500, message: '获取看板数据失败', error: error.message });
  }
};

module.exports = {
  getAllStudents,
  searchStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getDashboardData
};
