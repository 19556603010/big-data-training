<template>
  <div>
    <h2 style="margin-bottom: 20px">学生管理</h2>
    
    <el-card style="margin-bottom: 20px">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="学号">
          <el-input v-model="searchForm.student_no" placeholder="请输入学号" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchForm.name" placeholder="请输入姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="searchForm.class" placeholder="请选择班级" clearable>
            <el-option label="高一(1)班" value="高一(1)班"></el-option>
            <el-option label="高一(2)班" value="高一(2)班"></el-option>
            <el-option label="高二(1)班" value="高二(1)班"></el-option>
            <el-option label="高二(2)班" value="高二(2)班"></el-option>
            <el-option label="高三(1)班" value="高三(1)班"></el-option>
            <el-option label="高三(2)班" value="高三(2)班"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span style="font-weight: bold">学生列表</span>
          <el-button type="primary" @click="handleAdd">+新增学生</el-button>
        </div>
      </template>
      
      <el-table :data="filteredStudents" border stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="student_no" label="学号" width="120"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="gender" label="性别" width="80"></el-table-column>
        <el-table-column prop="class" label="班级" width="120"></el-table-column>
        <el-table-column prop="score" label="成绩" width="100">
          <template #default="scope">
            {{ scope.row.score }}
          </template>
        </el-table-column>
        <el-table-column prop="contact" label="联系方式" width="150"></el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form :model="studentForm" label-width="80px">
        <el-form-item label="学号">
          <el-input v-model="studentForm.student_no"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="studentForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="studentForm.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="studentForm.class" style="width: 100%">
            <el-option label="高一(1)班" value="高一(1)班"></el-option>
            <el-option label="高一(2)班" value="高一(2)班"></el-option>
            <el-option label="高二(1)班" value="高二(1)班"></el-option>
            <el-option label="高二(2)班" value="高二(2)班"></el-option>
            <el-option label="高三(1)班" value="高三(1)班"></el-option>
            <el-option label="高三(2)班" value="高三(2)班"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成绩">
          <el-input-number v-model="studentForm.score" :min="0" :max="100" :precision="1" style="width: 100%"></el-input-number>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="studentForm.contact"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { mockStudents } from '../mock/data'

const students = ref([...mockStudents])
const searchForm = ref({
  student_no: '',
  name: '',
  class: ''
})

const dialogVisible = ref(false)
const dialogTitle = ref('新增学生')
const isEdit = ref(false)
const studentForm = ref({
  id: null,
  student_no: '',
  name: '',
  gender: '男',
  class: '',
  score: 0,
  contact: ''
})

const filteredStudents = computed(() => {
  let result = students.value
  
  if (searchForm.value.student_no) {
    result = result.filter(s => s.student_no.includes(searchForm.value.student_no))
  }
  
  if (searchForm.value.name) {
    result = result.filter(s => s.name.includes(searchForm.value.name))
  }
  
  if (searchForm.value.class) {
    result = result.filter(s => s.class === searchForm.value.class)
  }
  
  return result
})

const handleSearch = () => {
  // 筛选通过computed自动生效
}

const handleReset = () => {
  searchForm.value = {
    student_no: '',
    name: '',
    class: ''
  }
}

const handleAdd = () => {
  dialogTitle.value = '新增学生'
  isEdit.value = false
  studentForm.value = {
    id: null,
    student_no: '',
    name: '',
    gender: '男',
    class: '',
    score: 0,
    contact: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑学生'
  isEdit.value = true
  studentForm.value = { ...row }
  dialogVisible.value = true
}

const handleSave = () => {
  if (!studentForm.value.student_no || !studentForm.value.name || !studentForm.value.class) {
    ElMessage.warning('请填写完整信息')
    return
  }

  if (isEdit.value) {
    const index = students.value.findIndex(s => s.id === studentForm.value.id)
    if (index !== -1) {
      students.value[index] = { ...studentForm.value }
      ElMessage.success('更新成功')
    }
  } else {
    const newId = Math.max(...students.value.map(s => s.id)) + 1
    students.value.push({ ...studentForm.value, id: newId })
    ElMessage.success('添加成功')
  }
  
  dialogVisible.value = false
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除该学生吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    students.value = students.value.filter(s => s.id !== row.id)
    ElMessage.success('删除成功')
  } catch {
    // 用户取消删除
  }
}
</script>

<style scoped>
.search-form {
  margin-bottom: 0;
}
</style>
