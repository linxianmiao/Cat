# 识猫小助手

上传猫猫图片，AI 帮你识别品种和性格。使用 Vue 3 + DangoUI + 第三方 LLM 接口（兼容 OpenAI Chat Completions）。

## 项目结构

- `cat-recognition/` - 前端 Vue 项目
- `server/` - 后端 Node.js 服务

## 快速开始

### 1. 配置后端

```bash
cd server
cp .env.example .env
# 编辑 .env，填入你的 NEBULA_API_KEY
```

**API Key：** 使用 `https://llm.ai-nebula.com` 提供的密钥。

### 2. 启动后端

```bash
cd server
npm run dev
# 或 npm start
```

### 3. 启动前端

```bash
cd cat-recognition
npm run dev
```

浏览器访问 http://localhost:5173 ，上传猫猫图片即可。

## 环境变量

| 变量 | 说明 |
|------|------|
| NEBULA_API_KEY | 第三方 LLM 接口 API 密钥（必填） |
| PORT | 后端端口，默认 3000 |
