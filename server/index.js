import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import catRouter from './routes/cat.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})
app.use(express.json({ limit: '50mb' }))
app.use('/api', catRouter)

// 捕获 body-parser 等中间件错误
app.use((err, req, res, _next) => {
  console.error('[middleware error]', err.status, err.message)
  res.status(err.status || 500).json({ message: err.message || '请求处理失败' })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
