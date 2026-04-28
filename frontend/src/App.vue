<template>
  <el-container style="height: 100vh">
    <el-header v-if="isLoggedIn" style="background: #409EFF; display: flex; align-items: center; justify-content: space-between; padding: 0 20px">
      <h2 style="color: white; margin: 0">学生信息管理系统</h2>
      <div style="color: white; display: flex; align-items: center; gap: 15px">
        <span>欢迎，{{ currentUser?.username }}</span>
        <el-button type="danger" size="small" @click="handleLogout">退出登录</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside v-if="isLoggedIn" width="200px" style="background: #f5f7fa">
        <el-menu
          :default-active="$route.path"
          router
          style="height: 100%"
        >
          <el-menu-item index="/dashboard">
            <el-icon><DataAnalysis /></el-icon>
            <span>数据看板</span>
          </el-menu-item>
          <el-menu-item index="/students">
            <el-icon><User /></el-icon>
            <span>学生管理</span>
          </el-menu-item>
          <el-menu-item index="/upload">
            <el-icon><Upload /></el-icon>
            <span>文件上传</span>
          </el-menu-item>
          <el-menu-item index="/profile">
            <el-icon><Setting /></el-icon>
            <span>个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const isLoggedIn = ref(false)
const currentUser = ref(null)

onMounted(() => {
  const user = localStorage.getItem('currentUser')
  if (user) {
    currentUser.value = JSON.parse(user)
    isLoggedIn.value = true
  }
})

const handleLogout = () => {
  localStorage.removeItem('currentUser')
  isLoggedIn.value = false
  currentUser.value = null
  ElMessage.success('退出登录成功')
  router.push('/login')
}
</script>
