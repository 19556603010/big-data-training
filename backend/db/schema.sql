CREATE DATABASE IF NOT EXISTS student_management DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE student_management;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  email VARCHAR(100),
  phone VARCHAR(20),
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_no VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  class VARCHAR(50) NOT NULL,
  score DECIMAL(5, 2) DEFAULT 0,
  contact VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT IGNORE INTO users (id, username, password, role, email, phone) VALUES
(1, 'admin', '123456', 'admin', 'admin@example.com', '13800138000'),
(2, 'test', '123456', 'user', 'test@example.com', '13900139000');

INSERT IGNORE INTO students (id, student_no, name, gender, class, score, contact) VALUES
(1, '2024001', '张三', '男', '高一(1)班', 85.5, '13800000001'),
(2, '2024002', '李四', '女', '高一(1)班', 92.0, '13800000002'),
(3, '2024003', '王五', '男', '高一(2)班', 78.5, '13800000003'),
(4, '2024004', '赵六', '女', '高一(2)班', 88.0, '13800000004'),
(5, '2024005', '孙七', '男', '高二(1)班', 95.0, '13800000005'),
(6, '2024006', '周八', '女', '高二(1)班', 82.5, '13800000006'),
(7, '2024007', '吴九', '男', '高二(2)班', 76.0, '13800000007'),
(8, '2024008', '郑十', '女', '高二(2)班', 90.5, '13800000008'),
(9, '2024009', '钱一', '男', '高三(1)班', 87.0, '13800000009'),
(10, '2024010', '孙二', '女', '高三(1)班', 93.5, '13800000010'),
(11, '2024011', '周三', '男', '高三(2)班', 79.5, '13800000011'),
(12, '2024012', '吴四', '女', '高三(2)班', 86.0, '13800000012'),
(13, '2024013', '郑五', '男', '高一(1)班', 81.0, '13800000013'),
(14, '2024014', '王六', '女', '高一(2)班', 94.5, '13800000014'),
(15, '2024015', '李七', '男', '高二(1)班', 77.5, '13800000015'),
(16, '2024016', '赵八', '女', '高二(2)班', 89.0, '13800000016'),
(17, '2024017', '孙九', '男', '高三(1)班', 83.5, '13800000017'),
(18, '2024018', '周十', '女', '高三(2)班', 91.0, '13800000018'),
(19, '2024019', '吴一', '男', '高一(1)班', 80.0, '13800000019'),
(20, '2024020', '郑二', '女', '高一(2)班', 88.5, '13800000020');
