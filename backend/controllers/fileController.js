const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.xls', '.xlsx', '.csv'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('只支持 Excel 和 CSV 文件格式'));
    }
  }
});

const uploadFile = (req, res) => {
  try {
    res.json({
      code: 200,
      message: '文件上传成功',
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: req.file.path
      }
    });
  } catch (error) {
    res.status(500).json({ code: 500, message: '文件上传失败', error: error.message });
  }
};

module.exports = { upload, uploadFile };
