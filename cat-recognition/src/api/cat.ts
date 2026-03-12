export interface MbtiDimension {
  letter: string
  name: string
  description: string
}

export interface CatMbti {
  type: string
  label: string
  dimensions: MbtiDimension[]
}

export interface CatAnalysisResult {
  breed: string
  nickname: string
  rarity: '普通' | '稀有' | '史诗' | '传说'
  cutenessScore: number
  mbti: CatMbti
  personality: string[]
  mood: string
  socialScore: number
  features: string[]
  fortune: string
  ownerTip: string
}

const API_BASE = import.meta.env.VITE_API_BASE || ''

export async function analyzeCat(imageBase64: string): Promise<CatAnalysisResult> {
  const res = await fetch(`${API_BASE}/api/analyze-cat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: imageBase64 }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(err.message || '识别失败，请稍后重试')
  }

  return res.json()
}
