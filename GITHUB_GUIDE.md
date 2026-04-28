# GitHub 推送指南

## 前提条件

1. 已安装 Git
2. 已注册 GitHub 账号
3. 已配置 Git SSH 或 HTTPS 认证

## 步骤

### 1. 初始化 Git 仓库

```bash
cd StudentMangement
git init
```

### 2. 添加所有文件

```bash
git add .
```

### 3. 提交代码

```bash
git commit -m "Initial commit: 学生信息管理系统"
```

### 4. 创建远程仓库

在 GitHub 上创建一个新的仓库，名称为 `StudentMangement`。

### 5. 关联远程仓库

```bash
git remote add origin git@github.com:你的用户名/StudentMangement.git
```

或使用 HTTPS：

```bash
git remote add origin https://github.com/你的用户名/StudentMangement.git
```

### 6. 推送代码

```bash
git branch -M main
git push -u origin main
```

## 注意事项

- 确保 `.env` 文件已添加到 `.gitignore`，避免泄露敏感信息
- 确保 `node_modules/` 目录不会被提交
- 推送前确认没有包含密码或其他敏感信息
