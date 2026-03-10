import { Router } from 'express'

const router = Router()

const API_BASE = 'https://llm.ai-nebula.com'
const MODEL = 'doubao-seed-2-0-pro-260215'

function parseImageInput(image) {
  if (image.startsWith('data:')) {
    return image // 已有 data:image/xxx;base64,xxx 格式，直接使用
  }
  return `data:image/jpeg;base64,${image}`
}

const PROMPT = `你是一个专业的猫咪面相分析师。请根据用户上传的猫图片进行全面分析，返回以下信息：

1. breed：猫的品种中文名
2. cutenessScore：根据猫的外表给出 60-99 之间的可爱评分（整数）
3. personality：3 个性格标签（每个 2-4 个字，如"聪明伶俐"、"话痨属性"）
4. mood：根据猫的表情和姿势推测当前心情（4-8 个字）
5. features：3 个外观独特之处（每条 5-10 个字的短语）
6. fortune：根据猫的面相编一段有趣的今日运势（15-25 个字）

如果图片中明显不是猫，请返回：{"breed":"无法识别","cutenessScore":0,"personality":[],"mood":"","features":[],"fortune":"这张图片中似乎没有猫猫哦，请上传一张清晰的猫猫照片～"}

请严格以 JSON 格式返回，不要包含 markdown 或其他文字：
{"breed":"品种名","cutenessScore":85,"personality":["标签1","标签2","标签3"],"mood":"心情描述","features":["特征1","特征2","特征3"],"fortune":"运势描述"}`

router.post('/analyze-cat', async (req, res) => {
  console.log('asdasdasdasd')
  try {
    const { image } = req.body
    if (!image || typeof image !== 'string') {
      return res.status(400).json({ message: '请提供图片' })
    }

    const apiKey = process.env.NEBULA_API_KEY
    if (!apiKey) {
      return res.status(500).json({ message: '服务未配置 NEBULA_API_KEY' })
    }

    const imageUrl = parseImageInput(image)

    const callApi = () =>
      fetch(`${API_BASE}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'image_url',
                  image_url: { url: imageUrl },
                },
                {
                  type: 'text',
                  text: PROMPT,
                },
              ],
            },
          ],
        }),
      })

    let response
    const maxRetries = 3
    for (let i = 0; i <= maxRetries; i++) {
      try {
        response = await callApi()
        console.log({response})
        const data = await response.json()

        if (!response.ok) {
          const err = new Error(data?.error?.message || response.statusText)
          err.status = response.status
          throw err
        }

        const content = data?.choices?.[0]?.message?.content?.trim()
        if (!content) {
          return res.status(500).json({ message: 'AI 返回为空' })
        }

        const jsonMatch = content.match(/\{[\s\S]*\}/)
        const result = jsonMatch ? JSON.parse(jsonMatch[0]) : { breed: '未知', personality: content }
        return res.json(result)
      } catch (e) {
        if (e?.status === 429 && i < maxRetries) {
          const delay = Math.pow(2, i + 1) * 1000
          await new Promise((r) => setTimeout(r, delay))
        } else {
          throw e
        }
      }
    }
  } catch (err) {
    console.error('Analyze error:', err)
    let message = '识别失败，请稍后重试'
    let status = 500
    if (err?.status === 401) {
      message = 'API Key 无效，请检查配置'
    } else if (err?.status === 429) {
      message = '请求过于频繁，请稍等 1 分钟后再试'
      status = 429
    }
    res.status(status).json({ message })
  }
})

export default router
