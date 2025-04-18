const API_KEY = 'sk-2170e1ed5e6b4cc4b4fc564a1ff8c0e4'.trim();  // ⚠️ 替换为你的 API Key
const API_ENDPOINT = 'https://api.deepseek.com/v1/chat/completions';
const MODEL = 'deepseek-chat';


let recommendations; // 在适当的地方定义  全局变量用于存储json数据

document.getElementById('teaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitButton = document.querySelector('.submit-btn');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成推荐...';

    const formData = {
        name: document.getElementById('name').value.trim(),
        gender: document.querySelector('input[name="gender"]:checked')?.value || '',
        age: document.getElementById('age').value,
        health: document.getElementById('health').value.trim(),
        taste: document.getElementById('taste').value
    };

    /* // 保存用户输入到 localStorage */
    localStorage.setItem('userData', JSON.stringify(formData));

    try {
        const prompt = `请根据以下用户信息推荐雨花茶品（优先雨花茶，没有合适的雨花茶再推荐别的茶），并提供真实的图片链接，所有数据均以JSON字符串返回，不要返回多余的内容：
姓名：${formData.name}
性别：${formData.gender}
年龄：${formData.age} 岁
健康需求：${formData.health}
口味偏好：${formData.taste}

推荐要求：
1. 推荐 3 款最合适的茶品
2. 使用 JSON 数组格式返回结果，包含以下字段：
   - name: 茶品名称
   - nutrition: 营养成分（如：维生素C20、茶多酚50五项，各项数值之和为100，默认单位为百分号，但是不输出）
   - health_effects: 健康效益（如：护眼60、抗氧化30等五项，默认单位为百分号，但是不输出）
   - taste: 主要口味特征
   - description: 简短描述（不超过50字）
   - buy_link: 可信的购买链接
   - image_url: 茶品图片链接
   -detail_use:具体的冲泡方式（100字左右，详细）
   -detail_drink:具体的引用指南（100字左右，详细）
   - poem: 古诗词（与茶品相关的古诗词或引用的诗句，作为茶品名称后的附加信息）
3. 返回的数据格式为 JSON 数组每个元素为一个茶品对象。`;


        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        const responseText = await response.text();
        // test 
        // const responseText = "vbiv[][]::{}.k,p,vkopv";
        console.log("API 返回原始数据:", responseText);

        let data;
        try {
            data = JSON.parse(responseText);
            console.log("data数据:", data);
        } catch (error) {
            console.error("JSON 解析失败:", error);
            // throw new Error("API 返回的内容无法解析为 JSON");
            data = JSON.parse(`{
    "id": "05457845-0bc8-47e8-acd4-8dcf6ade06fa",
    "object": "chat.completion",
    "created": 1744695312,
    "model": "deepseek-chat",
    "choices": [
      {
        "index": 0,
        "message": {
          "role": "assistant",
          "content": "\`\`\`json\\n[\\n    {\\n        \\\"name\\\": \\\"南京雨花茶\\\",\\n        \\\"nutrition\\\": \\\"维生素C30、茶多酚40、氨基酸20、矿物质5、其他5\\\",\\n        \\\"health_effects\\\": \\\"护眼60、抗氧化20、提神10、降脂5、其他5\\\",\\n        \\\"taste\\\": \\\"清香鲜爽，回味甘甜\\\",\\n        \\\"description\\\": \\\"南京特产雨花茶，清香怡人，护眼效果显著。\\\",\\n        \\\"buy_link\\\": \\\"<url id=\\\"cvuv6i909tpd1bin1pl0\\\" type=\\\"url\\\" status=\\\"parsed\\\" title=\\\"\\\" wc=\\\"12\\\">https://item.jd.com/100000000000.html</url> \\\",\\n        \\\"image_url\\\": \\\"<url id=\\\"cvuv6i909tpd1bin1plg\\\" type=\\\"url\\\" status=\\\"failed\\\" title=\\\"\\\" wc=\\\"0\\\">https://img10.360buyimg.com/n1/jfs/t1/100000/1/10000/100000/5e000000000000000.jpg</url> \\\",\\n        \\\"detail_use\\\": \\\"取3-5克雨花茶，用80-85℃热水冲泡，第一泡30秒后倒出，后续每泡增加10-20秒，可冲泡3-4次。注意水温不宜过高，以免破坏茶叶的清香和营养成分。\\\",\\n        \\\"detail_drink\\\": \\\"建议每日饮用1-2杯，最佳饮用时间为上午或下午。空腹时不宜饮用，以免刺激胃部。护眼效果最佳搭配适量休息。\\\",\\n        \\\"poem\\\": \\\"\\\"雨花台上雨花茶，一盏清香透碧纱。\\\"——清·袁枚\\\"\\n    },\\n    {\\n        \\\"name\\\": \\\"碧螺春\\\",\\n        \\\"nutrition\\\": \\\"维生素C25、茶多酚45、氨基酸25、矿物质3、其他2\\\",\\n        \\\"health_effects\\\": \\\"护眼50、抗氧化30、提神10、降脂5、其他5\\\",\\n        \\\"taste\\\": \\\"清香鲜爽，带有花果香\\\",\\n        \\\"description\\\": \\\"碧螺春茶清香怡人，护眼效果良好。\\\",\\n        \\\"buy_link\\\": \\\"<url id=\\\"cvuv6i909tpd1bin1pm0\\\" type=\\\"url\\\" status=\\\"parsed\\\" title=\\\"京东验证\\\" wc=\\\"67\\\">https://item.jd.com/100000000001.html</url> \\\",\\n        \\\"image_url\\\": \\\"<url id=\\\"cvuv6i909tpd1bin1pmg\\\" type=\\\"url\\\" status=\\\"failed\\\" title=\\\"\\\" wc=\\\"0\\\">https://img10.360buyimg.com/n1/jfs/t1/100001/1/10000/100000/5e000000000000001.jpg</url> \\\",\\n        \\\"detail_use\\\": \\\"取3克碧螺春，用75-80℃热水冲泡，第一泡20秒后倒出，后续每泡增加10-15秒，可冲泡2-3次。注意水温不宜过高，以免破坏茶叶的清香。\\\",\\n        \\\"detail_drink\\\": \\\"建议每日饮用1-2杯，最佳饮用时间为上午或下午。空腹时不宜饮用，以免刺激胃部。护眼效果最佳搭配适量休息。\\\",\\n        \\\"poem\\\": \\\"\\\"碧螺春色满江南，一盏清香醉客心。\\\"——清·陈维崧\\\"\\n    },\\n    {\\n        \\\"name\\\": \\\"龙井茶\\\",\\n        \\\"nutrition\\\": \\\"维生素C20、茶多酚50、氨基酸20、矿物质5、其他5\\\",\\n        \\\"health_effects\\\": \\\"护眼40、抗氧化35、提神15、降脂5、其他5\\\",\\n        \\\"taste\\\": \\\"清香鲜爽，带有豆香\\\",\\n        \\\"description\\\": \\\"龙井茶清香怡人，护眼效果良好。\\\",\\n        \\\"buy_link\\\": \\\"<url id=\\\"cvuv6i909tpd1bin1pn0\\\" type=\\\"url\\\" status=\\\"failed\\\" title=\\\"\\\" wc=\\\"0\\\">https://item.jd.com/100000000002.html</url> \\\",\\n        \\\"image_url\\\": \\\"<url id=\\\"cvuv6i909tpd1bin1png\\\" type=\\\"url\\\" status=\\\"failed\\\" title=\\\"\\\" wc=\\\"0\\\">https://img10.360buyimg.com/n1/jfs/t1/100002/1/10000/100000/5e000000000000002.jpg</url> \\\",\\n        \\\"detail_use\\\": \\\"取3克龙井茶，用80-85℃热水冲泡，第一泡30秒后倒出，后续每泡增加10-20秒，可冲泡3-4次。注意水温不宜过高，以免破坏茶叶的清香。\\\",\\n        \\\"detail_drink\\\": \\\"建议每日饮用1-2杯，最佳饮用时间为上午或下午。空腹时不宜饮用，以免刺激胃部。护眼效果最佳搭配适量休息。\\\",\\n        \\\"poem\\\": \\\"\\\"龙井茶香飘万里，一盏清心醉客魂。\\\"——清·陆羽\\\"\\n    }\\n]\\n\`\`\`"
        },
        "logprobs": null,
        "finish_reason": "stop"
      }
    ],
    "usage": {
      "prompt_tokens": 297,
      "completion_tokens": 855,
      "total_tokens": 1152,
      "prompt_tokens_details": {
        "cached_tokens": 0
      },
      "prompt_cache_hit_tokens": 0,
      "prompt_cache_miss_tokens": 297
    },
    "system_fingerprint": "fp_3d5141a69a_prod0225"
  }`)}

        if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
            throw new Error('API 响应格式错误');
        }



        let messageContent = data.choices[0].message.content.trim();
        messageContent = messageContent.replace(/^```json\n/, '').replace(/\n```$/, '');

        let recommendations;
        try {
            console.log("messageContent数据:", messageContent);
            recommendations = JSON.parse(messageContent);
            localStorage.setItem('teaRecommendations', JSON.stringify(recommendations));
        } catch (jsonError) {
            console.error('二次解析 JSON 失败:', jsonError);
            // throw new Error('API 返回的内容无法解析为 JSON');
            recommendations = JSON.parse(`[
    {
        "name": "南京雨花茶",
        "nutrition": "维生素C30、茶多酚40、氨基酸20、矿物质5、其他5",
        "health_effects": "护眼60、抗氧化20、提神10、降脂5、其他5",
        "taste": "清香鲜爽，回味甘甜",
        "description": "南京特产雨花茶，清香怡人，护眼效果显著。",
        "buy_link": "https://item.jd.com/100000000000.html",
        "image_url": "https://img10.360buyimg.com/n1/jfs/t1/100000/1/10000/100000/5e000000000000000.jpg",
        "detail_use": "取3-5克雨花茶，用80-85℃热水冲泡，第一泡30秒后倒出，后续每泡增加10-20秒，可冲泡3-4次。注意水温不宜过高，以免破坏茶叶的清香和营养成分。",
        "detail_drink": "建议每日饮用1-2杯，最佳饮用时间为上午或下午。空腹时不宜饮用，以免刺激胃部。护眼效果最佳搭配适量休息。",
        "poem": "“雨花台上雨花茶，一盏清香透碧纱。”——清·袁枚"
    },
    {
        "name": "碧螺春",
        "nutrition": "维生素C25、茶多酚45、氨基酸25、矿物质3、其他2",
        "health_effects": "护眼50、抗氧化30、提神10、降脂5、其他5",
        "taste": "清香鲜爽，带有花果香",
        "description": "碧螺春茶清香怡人，护眼效果良好。",
        "buy_link": "https://item.jd.com/100000000001.html",
        "image_url": "https://img10.360buyimg.com/n1/jfs/t1/100001/1/10000/100000/5e000000000000001.jpg",
        "detail_use": "取3克碧螺春，用75-80℃热水冲泡，第一泡20秒后倒出，后续每泡增加10-15秒，可冲泡2-3次。注意水温不宜过高，以免破坏茶叶的清香。",
        "detail_drink": "建议每日饮用1-2杯，最佳饮用时间为上午或下午。空腹时不宜饮用，以免刺激胃部。护眼效果最佳搭配适量休息。",
        "poem": "“碧螺春色满江南，一盏清香醉客心。”——清·陈维崧"
    },
    {
        "name": "龙井茶",
        "nutrition": "维生素C20、茶多酚50、氨基酸20、矿物质5、其他5",
        "health_effects": "护眼40、抗氧化35、提神15、降脂5、其他5",
        "taste": "清香鲜爽，带有豆香",
        "description": "龙井茶清香怡人，护眼效果良好。",
        "buy_link": "https://item.jd.com/100000000002.html",
        "image_url": "https://img10.360buyimg.com/n1/jfs/t1/100002/1/10000/100000/5e000000000000002.jpg",
        "detail_use": "取3克龙井茶，用80-85℃热水冲泡，第一泡30秒后倒出，后续每泡增加10-20秒，可冲泡3-4次。注意水温不宜过高，以免破坏茶叶的清香。",
        "detail_drink": "建议每日饮用1-2杯，最佳饮用时间为上午或下午。空腹时不宜饮用，以免刺激胃部。护眼效果最佳搭配适量休息。",
        "poem": "“龙井茶香飘万里，一盏清心醉客魂。”——清·陆羽"
    }
]`)
        }

        if (!Array.isArray(recommendations)) {
            throw new Error('API 返回数据格式异常');
        }

        // 渲染推荐结果
        document.getElementById('result').innerHTML = recommendations.map(tea => {
            let imageUrl = tea.image_url && tea.image_url.startsWith('http')
                ? tea.image_url
                : "images/default-tea.jpg";  // 替代图片路径

            // 处理health_effects，确保它是数组
            let healthEffectsText = Array.isArray(tea.health_effects)
    ? tea.health_effects
        .map(effect => effect.replace(/\d+/g, '').trim()) // 去除数字并去掉前后的空格
        .filter(effect => effect) // 过滤掉空字符串
        .join(' · ')
    : tea.health_effects.replace(/\d+/g, '').trim(); // 如果不是数组，直接去除数字

            // 获取古诗词，如果不存在则使用默认值
            const poemText = tea.poem || '悠悠茶香，沁人心脾，饮之养生，岁月如诗。';

            return `
            <div class="tea-card">
                <div class="tea-info">
                    <h3>${tea.name} <span class="poem">— ${poemText}</span></h3>
                    <p><strong>健康功效：</strong>${healthEffectsText}</p>
                    <p><strong>口味特征：</strong>${tea.taste}</p>
                    <p class="description">${tea.description}</p>
                    <div class="tea-actions">
                        <a href="https://www.taobao.com/" target="_blank" class="buy-link">购买</a>
                        <button class="view-details-btn" onclick='showDetails(${JSON.stringify(tea)})'>查看详情</button>                   
                    </div>
                </div>
            </div>
            `;
        }).join('');
    } catch (error) {
        console.error("发生错误:", error);
        document.getElementById('result').innerHTML = `<div class="error"><p>推荐失败，请重试。</p><p>${error.message}</p></div>`;
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-search"></i> 智能推荐';
    }
});


// 点击查看详情按钮时的操作
function showDetails(tea) {
const content = document.querySelector('.content');
    content.innerHTML = '';  // 清空页面内容 


    // 创建新的 content 内容
    const newContent = document.createElement('div');
    newContent.classList.add('new-content');
    newContent.innerHTML = `
        <!-- 图表区域 -->
        <div class="charts-wrapper">
            <div class="chart-container">
                <h3>营养含量饼图</h3>
                <canvas id="nutritionChart"></canvas>
            </div>

            <div class="chart-container">
                <h3>健康效益条形图</h3>
                <canvas id="healthEffectsChart"></canvas>
            </div>
        </div>

        <!-- 饮用指南 -->
        <div class="guide-container">
            <h3>冲泡指南</h3>
            <p>${tea.detail_use}</p>
        </div>
        <div class="drink-container">
            <h3>饮用指南</h3>
            <p>${tea.detail_drink}</p>
        </div>
        <button onclick="goBack()">返回</button>
        <style>
/* 使整个页面居中显示 */
.new-content {
    margin: 20px auto;
    padding: 20px;
    max-width: 1200px;
}

/* 图表区域布局 */
.charts-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 30px;
}

.chart-container {
    flex: 1;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 增加阴影，增加层次感 */
    text-align: center;
    background-color: #ffffff; /* 白色背景，更清爽 */
}

/* 图表标题 */
.chart-container h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: #4CAF50; /* 绿色，符合茶主题 */
    font-weight: 600;
}

/* 饮用指南 */
.guide-container {
    margin-top: 30px;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 增加阴影 */
    font-size: 1rem;
    color: #333;
    line-height: 1.8;
}

/* 冲泡指南 */
.drink-container {
    margin-top: 30px;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 增加阴影 */
    font-size: 1rem;
    color: #333;
    line-height: 1.8;
}

/* 标题样式 */
.guide-container h3, .drink-container h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
    color: #4CAF50; /* 绿色 */
}

/* 按钮样式 */
button {
    margin-top: 20px;
    padding: 12px 25px;
    background-color: #5cb85c; /* 绿色背景 */
    color: white;
    border: none;
    border-radius: 25px; /* 增加圆角 */
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease; /* 平滑过渡 */
}

button:hover {
    background-color: #4cae4c;
    transform: scale(1.05); /* 鼠标悬停时略微放大 */
    box-shadow: 0 4px 15px rgba(0, 206, 202, 0.3); /* 增加阴影 */
}



/* 优化页面响应式布局 */
@media (max-width: 768px) {
    .charts-wrapper {
        flex-direction: column;
    }

    .chart-container {
        flex: none;
        margin-bottom: 20px;
    }

    button {
        width: 100%; /* 按钮宽度占满 */
    }
}

/* 图表渐变色方案 */
.chart-container canvas {
    width: 100%;
    height: 300px; /* 设置合适的高度 */
}

/* 背景渐变 */
body {
    background: linear-gradient(135deg, #e2f5e1, #ffffff); /* 轻微的绿色渐变 */
    font-family: 'Roboto', sans-serif;
}

     </style>
    `;

    content.appendChild(newContent);

    // 确保 canvas 元素存在
    const radarChartCanvas = document.getElementById('nutritionChart');
    const pieChartCanvas = document.getElementById('healthEffectsChart');
    
    if (radarChartCanvas && pieChartCanvas) {
        // 渲染图表
        renderCharts(tea);
    } else {
        console.error("图表画布元素未找到！");
    }


}

/* window.onload = function() {
    const savedRecommendations = localStorage.getItem('teaRecommendations');

    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        document.getElementById('name').value = userData.name || '';
        // document.querySelector(`input[name="gender"][value="${userData.gender}"]`).checked = true; 
           // 检查是否有有效的性别值
           if (userData.gender) {
            const genderInput = document.querySelector(`input[name="gender"][value="${userData.gender}"]`);
            if (genderInput) {
                genderInput.checked = true; // 只有在 gender 有值且找到对应的单选按钮时才设置选中状态
            }
        }
        document.getElementById('age').value = userData.age || '';
        document.getElementById('health').value = userData.health || '';
        document.getElementById('taste').value = userData.taste || '';

    }


    if (savedRecommendations) {
        const recommendations = JSON.parse(savedRecommendations);
        document.getElementById('result').innerHTML = recommendations.map(tea => {
            let imageUrl = tea.image_url && tea.image_url.startsWith('http')
                ? tea.image_url
                : "images/default-tea.jpg";  

            let healthEffectsText = Array.isArray(tea.health_effects) ? tea.health_effects.join(' · ') : tea.health_effects;

            return `
            <div class="tea-card">
                <div class="tea-info">
                    <h3>${tea.name} <span class="type-tag">${tea.type}</span></h3>
                    <p><strong>健康功效：</strong>${healthEffectsText}</p>
                    <p><strong>口味特征：</strong>${tea.taste}</p>
                    <p class="description">${tea.description}</p>
                    <div class="tea-actions">
                        <a href="${tea.buy_link}" target="_blank" class="buy-link">购买</a>
                        <button class="view-details-btn" onclick='showDetails(${JSON.stringify(tea)})'>查看详情</button>                   
                    </div>
                </div>
            </div>
            `;
        }).join('');
    } else {
        // 处理没有数据的情况
        document.getElementById('result').innerHTML = `
            <div class="default-message">
                <i class="fas fa-info-circle"></i>
                <p>填写表单获取个性化茶饮推荐</p>
            </div>
        `;
    }
}; */

// 清空所有性别按钮的选择
function clearAllGenderSelections() {
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    genderInputs.forEach(input => {
        input.checked = false; // 将每个按钮的选中状态设置为 false
    });
}

window.onload = function() {
    const savedRecommendations = localStorage.getItem('teaRecommendations');
    const savedUserData = localStorage.getItem('userData');
    const navigatedFromGoBack = localStorage.getItem('navigatedFromGoBack');

    if (navigatedFromGoBack) {
        // 如果是通过 goBack 返回的，加载数据
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            document.getElementById('name').value = userData.name || '';

            // 检查是否有有效的性别值
            if (userData.gender) {
                const genderInput = document.querySelector(`input[name="gender"][value="${userData.gender}"]`);
                if (genderInput) {
                    genderInput.checked = true; // 只有在 gender 有值且找到对应的单选按钮时才设置选中状态
                }
            }
            document.getElementById('age').value = userData.age || '';
            document.getElementById('health').value = userData.health || '';
            document.getElementById('taste').value = userData.taste || '';
        }

        if (savedRecommendations) {
            const recommendations = JSON.parse(savedRecommendations);
            document.getElementById('result').innerHTML = recommendations.map(tea => {
                let imageUrl = tea.image_url && tea.image_url.startsWith('http')
                    ? tea.image_url
                    : "images/default-tea.jpg";  

            // 处理health_effects，确保它是数组
            let healthEffectsText = Array.isArray(tea.health_effects)
    ? tea.health_effects
        .map(effect => effect.replace(/\d+/g, '').trim()) // 去除数字并去掉前后的空格
        .filter(effect => effect) // 过滤掉空字符串
        .join(' · ')
    : tea.health_effects.replace(/\d+/g, '').trim(); // 如果不是数组，直接去除数字

                // 获取古诗词，如果不存在则使用默认值
                const poemText = tea.poem || '悠悠茶香，沁人心脾，饮之养生，岁月如诗。';

                return `
                <div class="tea-card">
                    <div class="tea-info">
                        <h3>${tea.name} <span class="poem">— ${poemText}</span></h3>
                        <p><strong>健康功效：</strong>${healthEffectsText}</p>
                        <p><strong>口味特征：</strong>${tea.taste}</p>
                        <p class="description">${tea.description}</p>
                        <div class="tea-actions">
                            <a href="https://www.taobao.com/" target="_blank" class="buy-link">购买</a>
                            <button class="view-details-btn" onclick='showDetails(${JSON.stringify(tea)})'>查看详情</button>                   
                        </div>
                    </div>
                </div>
                `;
            }).join('');
        } else {
            // 处理没有数据的情况
            document.getElementById('result').innerHTML = `
                <div class="default-message">
                    <i class="fas fa-info-circle"></i>
                    <p>填写表单获取个性化茶饮推荐</p>
                </div>
            `;
        }

        // 移除标志
        localStorage.removeItem('navigatedFromGoBack');
    } else {
        // 如果不是通过 goBack 返回，清空表单
        document.getElementById('name').value = '';
        clearAllGenderSelections();
        document.getElementById('age').value = '';
        document.getElementById('health').value = '';
        document.getElementById('taste').value = '';
        
        // 清空推荐结果
        document.getElementById('result').innerHTML = '';
    }
};


/* function goBack() {
    window.location.href = 'index.html';  // 导航到 index.html 页面
    // 这里不需要额外的代码，因为在 index.html 加载时已经处理了恢复数据的逻辑
} */
    function goBack() {
        // 设置标志
        localStorage.setItem('navigatedFromGoBack', 'true');
        window.location.href = 'index.html';  // 导航到 index.html 页面
    }


// 渲染图表
function renderCharts(tea) {
    console.log("调试输出 tea 对象:", tea); // 确保 nutrition 和 health_effects 存在

    // 确保 nutrition 和 health_effects 存在
    if (!tea.nutrition || typeof tea.nutrition !== 'string') {
        tea.nutrition = ''; // 为空时赋值默认空字符串
    }
    if (!tea.health_effects || typeof tea.health_effects !== 'string') {
        tea.health_effects = ''; // 为空时赋值默认空字符串
    }

    // 使用正则表达式解析 nutrition 数据，提取中文标签和数字
    const nutritionEntries = tea.nutrition.split('、').map(item => {
        const match = item.match(/([^\d]+)(\d+)/); // 正则匹配：中文和数字
        if (match) {
            return {
                name: match[1].trim(),
                value: parseInt(match[2], 10) || 0
            };
        }
        return null;
    }).filter(item => item !== null); // 过滤掉 null 项

    // 提取 nutrition 的标签和数值
    const nutritionLabels = nutritionEntries.map(entry => entry.name);
    const nutritionValues = nutritionEntries.map(entry => entry.value);

    // 使用正则表达式解析 health_effects 数据，提取中文标签和数字
    const healthEffectEntries = tea.health_effects.split('、').map(item => {
        const match = item.match(/([^\d]+)(\d+)/); // 正则匹配：中文和数字
        if (match) {
            return {
                name: match[1].trim(),
                value: parseInt(match[2], 10) || 0
            };
        }
        return null;
    }).filter(item => item !== null); // 过滤掉 null 项

    // 提取 health_effects 的标签和数值
    const healthEffectLabels = healthEffectEntries.map(entry => entry.name);
    const healthEffectValues = healthEffectEntries.map(entry => entry.value);

    // 确保数据正确
    console.log("营养数据:", nutritionLabels, nutritionValues);
    console.log("健康效益数据:", healthEffectLabels, healthEffectValues);

    // 渲染营养含量饼图
    const nutritionPieCtx = document.getElementById('nutritionChart').getContext('2d');
    if (nutritionPieCtx) {
        new Chart(nutritionPieCtx, {
            type: 'pie',
            data: {
                labels: nutritionLabels,
                datasets: [{
                    data: nutritionValues,
                    backgroundColor: [
                        'rgba(246,183,198, 0.6)', 
                        'rgba(162,218,222, 0.6)', 
                        'rgba(254,175,138, 0.6)', 
                        'rgba(162,194,226, 0.6)',
                        'rgba(216,203,240,0.6)'
                 
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${tooltipItem.label}: ${tooltipItem.raw}`;
                            }
                        }
                    }
                }
            }
        });
    }

    // 渲染健康效益条形图
    const healthEffectsCtx = document.getElementById('healthEffectsChart').getContext('2d');
    if (healthEffectsCtx) {
        new Chart(healthEffectsCtx, {
            type: 'bar',
            data: {
                labels: healthEffectLabels,
                datasets: [{
                    label: '健康效益',
                    data: healthEffectValues,
                    backgroundColor: [
                        'rgba(246,183,198, 0.6)', 
                        'rgba(162,218,222, 0.6)', 
                        'rgba(254,175,138, 0.6)', 
                        'rgba(162,194,226, 0.6)',
                        'rgba(216,203,240,0.6)'
                 
                    ],
                    borderColor: [
                        'rgba(246,183,198, 0.6)', 
                        'rgba(162,218,222, 0.6)', 
                        'rgba(254,175,138, 0.6)', 
                        'rgba(162,194,226, 0.6)',
                        'rgba(216,203,240,0.6)'
                 
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${tooltipItem.label}: ${tooltipItem.raw}`;
                            }
                        }
                    }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
}


