<template>
  <div>
    <h2 style="margin-bottom: 20px">个人中心</h2>
    
    <el-card>
      <template #header>
        <div style="font-weight: bold">个人信息</div>
      </template>
      
      <el-form :model="userForm" label-width="100px" style="max-width: 500px">
        <el-form-item label="用户名">
          <el-input v-model="userForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-tag :type="userForm.role === 'admin' ? 'danger' : 'success'">
            {{ userForm.role === 'admin' ? '管理员' : '普通用户' }}
          </el-tag>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="userForm.password" placeholder="留空则不修改密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const userForm = ref({
  username: '',
  role: '',
  email: '',
  phone: '',
  password: ''
})

const originalForm = ref({})

onMounted(() => {
  const user = localStorage.getItem('currentUser')
  if (user) {
    const userData = JSON.parse(user)
    userForm.value = {
      username: userData.username,
      role: userData.role,
      email: userData.email || '',
      phone: userData.phone || '',
      password: ''
    }
    originalForm.value = { ...userForm.value }
  }
})

const handleSave = () => {
  if (!userForm.value.email || !userForm.value.phone) {
    ElMessage.warning('请填写完整信息')
    return
  }

  const updatedUser = {
    username: userForm.value.username,
    role: userForm.value.role,
    email: userForm.value.email,
    phone: userForm.value.phone
  }
  
  localStorage.setItem('currentUser', JSON.stringify(updatedUser))
  originalForm.value = { ...userForm.value, password: '' }
  userForm.value.password = ''
  
  ElMessage.success('保存成功')
}

const handleReset = () => {
  userForm.value = { ...originalForm.value, password: '' }
}
</script>
