const fs = require('fs');
const path = require('path');
const https = require('https');

const GITHUB_USER = '19556603010';
const GITHUB_REPO = 'big-data-training';
const GITHUB_BRANCH = 'main';
const TOKEN = 'ghp_ATLJ83Wy3pGx13z0NGNpKyVGewFBFV1h0Cco';

function encodeBase64(data) {
  return Buffer.from(data).toString('base64');
}

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function uploadFile(filePath, githubPath) {
  const content = fs.readFileSync(filePath);
  const encodedContent = encodeBase64(content);
  
  const options = {
    hostname: 'api.github.com',
    path: `/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${githubPath}`,
    method: 'PUT',
    headers: {
      'User-Agent': 'Node.js',
      'Content-Type': 'application/json',
      'Authorization': `token ${TOKEN}`
    }
  };
  
  const data = JSON.stringify({
    message: `Add ${githubPath}`,
    content: encodedContent,
    branch: GITHUB_BRANCH
  });
  
  const response = await makeRequest(options, data);
  console.log(`Upload ${githubPath}: ${response.status}`);
  return response;
}

async function listFiles(dir, prefix = '') {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      if (item === 'node_modules' || item === '.git') continue;
      files.push(...await listFiles(fullPath, prefix + item + '/'));
    } else {
      files.push({ local: fullPath, remote: prefix + item });
    }
  }
  
  return files;
}

async function main() {
  console.log('开始上传项目到 GitHub...');
  
  try {
    const files = await listFiles('.');
    console.log(`找到 ${files.length} 个文件`);
    
    for (const { local, remote } of files) {
      console.log(`上传: ${remote}`);
      const response = await uploadFile(local, remote);
      if (response.status !== 201 && response.status !== 200) {
        console.log(`  错误: ${response.data.message || response.data}`);
      }
    }
    
    console.log('\n✅ 上传完成！');
  } catch (error) {
    console.error('❌ 上传失败:', error.message);
  }
}

main();
