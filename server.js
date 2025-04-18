const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5500;

app.use(cors()); // 启用 CORS
app.use(express.json()); // 解析请求的 JSON 数据

const API_KEY = 'sk-2170e1ed5e6b4cc4b4fc564a1ff8c0e4'.trim();  // ⚠️ 替换为你的 API Key
const API_ENDPOINT = 'https://api.deepseek.com/v1/chat/completions';

// 处理前端发来的请求，转发给 DeepSeek API
app.post('/api/recommend', async (req, res) => {
    try {
        console.log('收到请求的数据:', req.body); // 输出请求数据

        const response = await axios.post(API_ENDPOINT, req.body, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('DeepSeek API 返回:', response.data); // 输出 DeepSeek API 返回的数据
        res.json(response.data); // 返回给前端
    } catch (error) {
        console.error('API 请求失败:', error.message); // 记录错误
        res.status(500).json({ error: 'API 请求失败', details: error.message });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器已启动，正在监听端口 ${port}`);
});
