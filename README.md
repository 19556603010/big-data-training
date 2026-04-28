# 学生信息管理系统

一个基于 Vue 3 + Vite + Node.js 的前后端分离学生信息管理系统。

## 功能特性

- 登录系统：支持测试账号和管理员账号登录
- 数据看板：可视化展示班级学生人数分布
- 学生管理：完整的增删改查功能，支持按学号、姓名、班级筛选
- 文件上传：支持批量导入学生信息（Excel/CSV）
- 个人中心：查看和编辑个人信息

## 技术栈

- **前端**：Vue 3、Vite、Element Plus、ECharts、Axios
- **后端**：Node.js、Express、MySQL

## 快速开始

### 后端启动

```bash
cd backend
npm install
npm start
```

后端服务将在 `http://localhost:3000` 启动

### 前端启动

```bash
cd frontend
npm install
npm run dev
```

前端开发服务器将在 `http://localhost:5173` 启动

## 测试账号

- 普通用户：test / 123456
- 管理员：admin / 123456

## 模拟数据模式

当前系统支持离线模拟数据运行，无需后端服务即可体验完整功能。

## 项目结构

```
StudentMangement/
├── frontend/
│   ├── src/
│   │   ├── router/      # 路由配置
│   │   ├── views/       # 页面组件
│   │   ├── components/  # 公共组件
│   │   ├── api/         # API 请求
│   │   ├── mock/        # 模拟数据
│   │   ├── App.vue      # 根组件
│   │   └── main.js      # 入口文件
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── backend/
│   ├── config/          # 数据库配置
│   ├── controllers/     # 控制器
│   ├── models/          # 数据模型
│   ├── routes/          # 路由
│   ├── db/              # 数据库脚本
│   ├── uploads/         # 上传文件目录
│   ├── app.js           # 入口文件
│   └── package.json
├── .env                 # 环境变量
└── .gitignore
```
