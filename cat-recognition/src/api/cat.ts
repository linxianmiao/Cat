export interface CatAnalysisResult {
  breed: string
  cutenessScore: number
  personality: string[]
  mood: string
  features: string[]
  fortune: string
}

export async function analyzeCat(imageBase64: string): Promise<CatAnalysisResult> {
  const res = await fetch('/api/analyze-cat', {
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
