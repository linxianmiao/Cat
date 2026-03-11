import { Router } from 'express'

const router = Router()

const API_BASE = 'https://llm.ai-nebula.com'
const MODEL = 'claude-opus-4-6'

function parseImageInput(image) {
  if (image.startsWith('data:')) {
    return image // 已有 data:image/xxx;base64,xxx 格式，直接使用
  }
  return `data:image/jpeg;base64,${image}`
}

const PROMPT = `你是"喵相馆"首席猫咪面相分析师和猫咪心理学专家。请根据用户上传的猫咪图片进行全面深度面相分析，返回以下所有字段：

1. breed：猫的品种中文名（如"英国短毛猫"、"橘猫"、"布偶猫"、"狸花猫"、“金点”、“银点”、“美短”等，尽量精确）
2. nickname：根据猫的外貌气质起一个有趣的 2-5 字昵称（如"贵族小可爱"、"暗夜猎手"、"甜心棉花糖"、"傲娇女王"）
3. rarity：稀有度评级，必须是以下四个值之一："普通"、"稀有"、"史诗"、"传说"。根据品种稀有程度和外貌独特性综合判定，大部分猫应为"稀有"或"史诗"级别
4. cutenessScore：可爱值评分，60-99 之间的整数
5. mbti：为这只猫分析一个 MBTI 性格类型，包含以下子字段：
   - type：四字母 MBTI 类型代码（如"INFJ"、"ENFP"、"ISTP"等，请根据猫的行为特征认真分析选择）
   - label：类型中文标签（格式为"XXXX 型人格"，如"INFJ 型人格"）
   - dimensions：必须包含 4 个维度对象的数组，按顺序分别对应 MBTI 的四个维度：
     第1个：letter 为 "I" 或 "E"，name 为"内向"或"外向"，description 为基于这只猫特征的维度描述（10-20字）
     第2个：letter 为 "N" 或 "S"，name 为"直觉"或"感觉"，description 为基于这只猫特征的维度描述（10-20字）
     第3个：letter 为 "F" 或 "T"，name 为"情感"或"思维"，description 为基于这只猫特征的维度描述（10-20字）
     第4个：letter 为 "J" 或 "P"，name 为"判断"或"知觉"，description 为基于这只猫特征的维度描述（10-20字）
6. personality：3 个性格标签（每个 2-4 个字，如"高贵优雅"、"温柔体贴"、"暗带傲娇"）
7. mood：根据猫的表情和姿势推测当前状态（3-6 个字，如"心情愉悦"、"慵懒惬意"、"警觉观察"）
8. socialScore：社交指数，0-100 之间的整数，表示猫咪的社交能力和亲人程度
9. features：3 个外观上的独特特征（每条 5-10 个字的短语，如"圆圆的大眼睛"、"柔软的毛发"）
10. fortune：根据猫的面相编一段有趣具体的今日运势（25-50 个字，要包含具体时间和行为建议，如"今日运势极佳！适合撒娇要零食，成功率99%。下午3点是最佳时机哦~"）
11. ownerTip：铲屎官贴士，给猫主人的实用建议（20-40 个字，如"你家主子今天心情不错，记得多陪TA玩耍，会收获更多亲昵哦！"）

如果图片中明显不是猫（如狗、其他动物、非动物等），请返回：
{"breed":"无法识别","nickname":"未知生物","rarity":"普通","cutenessScore":0,"mbti":{"type":"????","label":"未知型人格","dimensions":[{"letter":"?","name":"未知","description":"需要一张猫猫照片才能分析哦"}]},"personality":[],"mood":"","socialScore":0,"features":[],"fortune":"这张图片中似乎没有猫猫哦，请上传一张清晰的猫猫照片~","ownerTip":"先找到你的猫猫再来吧"}

请严格以 JSON 格式返回，不要包含 markdown 代码块标记或任何其他非 JSON 文字，直接返回 JSON 对象：
{"breed":"品种名","nickname":"昵称","rarity":"稀有度","cutenessScore":85,"mbti":{"type":"INFJ","label":"INFJ 型人格","dimensions":[{"letter":"I","name":"内向","description":"维度描述"},{"letter":"N","name":"直觉","description":"维度描述"},{"letter":"F","name":"情感","description":"维度描述"},{"letter":"J","name":"判断","description":"维度描述"}]},"personality":["标签1","标签2","标签3"],"mood":"心情描述","socialScore":85,"features":["特征1","特征2","特征3"],"fortune":"运势描述","ownerTip":"铲屎官建议"}`

router.post('/analyze-cat', async (req, res) => {
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
          max_tokens: 2048,
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
