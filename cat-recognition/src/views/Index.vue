<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useToast } from 'dangoui'
import { analyzeCat, type CatAnalysisResult } from '../api/cat'
import { compressImage } from '../utils/image'
import PageHeader from '../components/PageHeader.vue'
import ImagePreview from '../components/ImagePreview.vue'
import UploadZone from '../components/UploadZone.vue'
import AnalyzingCard from '../components/AnalyzingCard.vue'
import AnalysisReport from '../components/AnalysisReport.vue'

const toast = useToast()

type PageState = 'idle' | 'preview' | 'analyzing' | 'done'

const state = ref<PageState>('idle')
const previewUrl = ref('')
const imageBase64 = ref('')
const result = ref<CatAnalysisResult | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const progressText = ref('正在识别猫咪品种...')

const progressTexts = [
  '正在识别猫咪品种...',
  '正在分析面部特征...',
  '正在解读猫咪性格...',
  '正在生成分析报告...',
]
let progressTimer: ReturnType<typeof setInterval> | null = null
let progressIndex = 0

function startProgressAnimation() {
  progressIndex = 0
  progressText.value = progressTexts[0]
  progressTimer = setInterval(() => {
    progressIndex = (progressIndex + 1) % progressTexts.length
    progressText.value = progressTexts[progressIndex]
  }, 2500)
}

function stopProgressAnimation() {
  if (progressTimer) {
    clearInterval(progressTimer)
    progressTimer = null
  }
}

onUnmounted(() => stopProgressAnimation())

function handleUploadClick() {
  if (state.value === 'analyzing') return
  inputRef.value?.click()
}

async function handleFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !file.type.startsWith('image/')) {
    toast.show({ message: '请选择图片文件' })
    input.value = ''
    return
  }
  input.value = ''

  try {
    const url = URL.createObjectURL(file)
    previewUrl.value = url
    const base64 = await compressImage(file)
    imageBase64.value = base64
    previewUrl.value = base64
    URL.revokeObjectURL(url)
    state.value = 'preview'
  } catch {
    toast.show({ message: '图片加载失败，请重试' })
  }
}

async function handleAnalyze() {
  if (!imageBase64.value) return
  state.value = 'analyzing'
  result.value = null
  startProgressAnimation()

  try {
    const res = await analyzeCat(imageBase64.value)
    result.value = res
    state.value = 'done'
  } catch (err) {
    toast.show({
      message: err instanceof Error ? err.message : '识别失败，请稍后重试',
    })
    state.value = 'preview'
  } finally {
    stopProgressAnimation()
  }
}

function handleReset() {
  state.value = 'idle'
  previewUrl.value = ''
  imageBase64.value = ''
  result.value = null
}
</script>

<template>
  <div class="page">
    <input
      ref="inputRef"
      type="file"
      accept="image/*"
      capture="environment"
      class="file-input"
      @change="handleFileChange"
    />

    <PageHeader />

    <!-- Idle: Upload area -->
    <UploadZone v-if="state === 'idle'" @click="handleUploadClick" />

    <!-- Preview: Image uploaded -->
    <section v-if="state === 'preview'" class="content-section">
      <ImagePreview :src="previewUrl" />
      <div class="action-buttons">
        <button class="btn-gradient btn-full" @click="handleAnalyze">
          ✨ 开始分析
        </button>
        <button class="btn-outline btn-full" @click="handleReset">
          重新选择
        </button>
      </div>
    </section>

    <!-- Analyzing -->
    <section v-if="state === 'analyzing'" class="content-section">
      <ImagePreview :src="previewUrl" />
      <AnalyzingCard :text="progressText" />
    </section>

    <!-- Done: Results -->
    <section v-if="state === 'done' && result" class="content-section">
      <ImagePreview :src="previewUrl" />
      <AnalysisReport :result="result" />
      <button class="btn-gradient btn-full" @click="handleReset">
        分析新照片
      </button>
    </section>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(180deg, #fef0f5 0%, #f8f0ff 50%, #fff 100%);
}

.file-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}

/* ===== Buttons ===== */
.btn-gradient {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  background: linear-gradient(90deg, #ff6b9d, #c471ed);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-gradient:active {
  opacity: 0.85;
}

.btn-full {
  width: 100%;
  padding: 15px 24px;
  font-size: 16px;
  border-radius: 12px;
}

.btn-outline {
  width: 100%;
  padding: 15px 24px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: #fff;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-outline:active {
  background: #f5f5f5;
}

/* ===== Content sections ===== */
.content-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
