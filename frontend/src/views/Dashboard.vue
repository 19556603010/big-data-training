<template>
  <div>
    <h2 style="margin-bottom: 20px">数据看板</h2>
    
    <el-row :gutter="20" style="margin-bottom: 30px">
      <el-col :span="8">
        <el-card shadow="hover">
          <div style="text-align: center">
            <div style="font-size: 36px; color: #409EFF; font-weight: bold">{{ dashboardData.totalStudents }}</div>
            <div style="color: #909399; margin-top: 10px">总学生数</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div style="text-align: center">
            <div style="font-size: 36px; color: #67C23A; font-weight: bold">{{ dashboardData.classCount }}</div>
            <div style="color: #909399; margin-top: 10px">班级数量</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div style="text-align: center">
            <div style="font-size: 36px; color: #E6A23C; font-weight: bold">{{ dashboardData.todayNew }}</div>
            <div style="color: #909399; margin-top: 10px">今日新增</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card>
      <template #header>
        <div style="font-weight: bold">班级学生人数分布</div>
      </template>
      <div ref="chartRef" style="width: 100%; height: 400px"></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { mockDashboardData } from '../mock/data'

const chartRef = ref(null)
const dashboardData = ref(mockDashboardData)

onMounted(() => {
  initChart()
})

const initChart = () => {
  const chart = echarts.init(chartRef.value)
  
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}人 ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle'
    },
    series: [
      {
        name: '班级人数',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: dashboardData.value.classDistribution
      }
    ]
  }
  
  chart.setOption(option)
  
  window.addEventListener('resize', () => {
    chart.resize()
  })
}
</script>
