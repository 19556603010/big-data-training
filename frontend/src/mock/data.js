export const mockStudents = [
  { id: 1, student_no: '2024001', name: '张三', gender: '男', class: '高一(1)班', score: 85.5, contact: '13800000001' },
  { id: 2, student_no: '2024002', name: '李四', gender: '女', class: '高一(1)班', score: 92.0, contact: '13800000002' },
  { id: 3, student_no: '2024003', name: '王五', gender: '男', class: '高一(2)班', score: 78.5, contact: '13800000003' },
  { id: 4, student_no: '2024004', name: '赵六', gender: '女', class: '高一(2)班', score: 88.0, contact: '13800000004' },
  { id: 5, student_no: '2024005', name: '孙七', gender: '男', class: '高二(1)班', score: 95.0, contact: '13800000005' },
  { id: 6, student_no: '2024006', name: '周八', gender: '女', class: '高二(1)班', score: 82.5, contact: '13800000006' },
  { id: 7, student_no: '2024007', name: '吴九', gender: '男', class: '高二(2)班', score: 76.0, contact: '13800000007' },
  { id: 8, student_no: '2024008', name: '郑十', gender: '女', class: '高二(2)班', score: 90.5, contact: '13800000008' },
  { id: 9, student_no: '2024009', name: '钱一', gender: '男', class: '高三(1)班', score: 87.0, contact: '13800000009' },
  { id: 10, student_no: '2024010', name: '孙二', gender: '女', class: '高三(1)班', score: 93.5, contact: '13800000010' },
  { id: 11, student_no: '2024011', name: '周三', gender: '男', class: '高三(2)班', score: 79.5, contact: '13800000011' },
  { id: 12, student_no: '2024012', name: '吴四', gender: '女', class: '高三(2)班', score: 86.0, contact: '13800000012' },
  { id: 13, student_no: '2024013', name: '郑五', gender: '男', class: '高一(1)班', score: 81.0, contact: '13800000013' },
  { id: 14, student_no: '2024014', name: '王六', gender: '女', class: '高一(2)班', score: 94.5, contact: '13800000014' },
  { id: 15, student_no: '2024015', name: '李七', gender: '男', class: '高二(1)班', score: 77.5, contact: '13800000015' },
  { id: 16, student_no: '2024016', name: '赵八', gender: '女', class: '高二(2)班', score: 89.0, contact: '13800000016' },
  { id: 17, student_no: '2024017', name: '孙九', gender: '男', class: '高三(1)班', score: 83.5, contact: '13800000017' },
  { id: 18, student_no: '2024018', name: '周十', gender: '女', class: '高三(2)班', score: 91.0, contact: '13800000018' },
  { id: 19, student_no: '2024019', name: '吴一', gender: '男', class: '高一(1)班', score: 80.0, contact: '13800000019' },
  { id: 20, student_no: '2024020', name: '郑二', gender: '女', class: '高一(2)班', score: 88.5, contact: '13800000020' }
]

export const mockUsers = {
  admin: { username: 'admin', password: '123456', role: 'admin', email: 'admin@example.com', phone: '13800138000' },
  test: { username: 'test', password: '123456', role: 'user', email: 'test@example.com', phone: '13900139000' }
}

export const mockDashboardData = {
  totalStudents: 20,
  classCount: 6,
  todayNew: 0,
  classDistribution: [
    { name: '高一(1)班', value: 4 },
    { name: '高一(2)班', value: 4 },
    { name: '高二(1)班', value: 3 },
    { name: '高二(2)班', value: 3 },
    { name: '高三(1)班', value: 3 },
    { name: '高三(2)班', value: 3 }
  ]
}
