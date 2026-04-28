<template>
  <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
    <el-card style="width: 400px">
      <h2 style="text-align: center; margin-bottom: 30px; color: #409EFF">学生信息管理系统</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="User" size="large"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" prefix-icon="Lock" type="password" size="large" @keyup.enter="handleLogin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" size="large" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-top: 20px; padding: 15px; background: #f5f7fa; border-radius: 4px">
        <p style="margin: 5px 0; font-size: 14px; color: #606266">测试账号：test / 123456</p>
        <p style="margin: 5px 0; font-size: 14px; color: #606266">管理员账号：admin / 123456</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { mockUsers } from '../mock/data'

const router = useRouter()
const loginFormRef = ref(null)
const loginForm = ref({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleLogin = async () => {
  try {
    const { username, password } = loginForm.value
    
    if (!username || !password) {
      ElMessage.warning('请输入用户名和密码')
      return
    }

    const user = mockUsers[username]
    
    if (!user || user.password !== password) {
      ElMessage.error('用户名或密码错误')
      return
    }

    localStorage.setItem('currentUser', JSON.stringify(user))
    ElMessage.success('登录成功')
    router.push('/dashboard')
  } catch (error) {
    ElMessage.error('登录失败')
  }
}
</script>
