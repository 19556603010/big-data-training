<template>
  <div>
    <h2 style="margin-bottom: 20px">文件上传</h2>
    
    <el-card>
      <template #header>
        <div style="font-weight: bold">批量上传学生信息</div>
      </template>
      
      <el-alert
        title="支持格式"
        description="支持 Excel (.xls, .xlsx) 和 CSV 格式文件，文件大小不超过 10MB"
        type="info"
        show-icon
        style="margin-bottom: 20px"
      ></el-alert>
      
      <el-upload
        class="upload-demo"
        drag
        action="/api/upload"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="beforeUpload"
        accept=".xls,.xlsx,.csv"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            只能上传 xls/xlsx/csv 文件，且不超过 10MB
          </div>
        </template>
      </el-upload>
      
      <div v-if="uploadedFiles.length > 0" style="margin-top: 30px">
        <h3 style="margin-bottom: 15px">已上传文件</h3>
        <el-table :data="uploadedFiles" border stripe>
          <el-table-column prop="name" label="文件名"></el-table-column>
          <el-table-column prop="size" label="大小" width="150"></el-table-column>
          <el-table-column prop="time" label="上传时间" width="200"></el-table-column>
          <el-table-column label="状态" width="120">
            <template #default>
              <el-tag type="success">已上传</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const uploadedFiles = ref([])

const beforeUpload = (file) => {
  const isLt10M = file.size / 1024 / 1024 < 10
  if (!isLt10M) {
    ElMessage.error('文件大小不能超过 10MB!')
  }
  return isLt10M
}

const handleSuccess = (response, file) => {
  uploadedFiles.value.push({
    name: file.name,
    size: (file.size / 1024).toFixed(2) + ' KB',
    time: new Date().toLocaleString()
  })
  ElMessage.success('文件上传成功')
}

const handleError = () => {
  ElMessage.error('文件上传失败，请重试')
}
</script>
