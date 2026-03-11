
<template>
  <div class="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white">
    <!-- Hidden file inputs -->
    <input
      ref="cameraInputRef"
      type="file"
      accept="image/*"
      capture="environment"
      class="absolute w-0 h-0 opacity-0 pointer-events-none"
      @change="handleFileChange"
    />
    <input
      ref="albumInputRef"
      type="file"
      accept="image/*"
      class="absolute w-0 h-0 opacity-0 pointer-events-none"
      @change="handleFileChange"
    />

    <NavBar />

    <!-- ===== IDLE: Home ===== -->
    <div v-if="state === 'idle'" class="flex flex-col gap-3.5 px-4 pt-4 pb-8">
      <HeroSection />
      <SocialProofBar />
      <UploadButtons @capture="handleCameraClick" @upload="handleAlbumClick" />
      <!-- <FeatureHighlights /> -->
    </div>

    <!-- ===== PREVIEW ===== -->
    <div v-if="state === 'preview'" class="flex flex-col gap-3.5 px-4 pt-4 pb-8">
      <ImagePreview :src="previewUrl" show-reselect @reselect="handleReset" />
      <button
        class="w-full py-[15px] px-6 inline-flex items-center justify-center gap-1.5 border-none bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold text-base rounded-xl cursor-pointer transition-opacity duration-200 active:opacity-85"
        @click="handleAnalyze"
      >
        <Sparkles class="w-[18px]" />
        立即分析主子面相
      </button>
      <p class="text-[13px] text-gray-500 text-center m-0">💡 提示：正脸照片分析结果更准确哦</p>
    </div>

    <!-- ===== ANALYZING ===== -->
    <div v-if="state === 'analyzing'" class="flex flex-col gap-3.5 px-4 pt-4 pb-8">
      <ImagePreview :src="previewUrl" />
      <AnalyzingCard :text="progressText" :progress="progress" :online-count="onlineCount" />
    </div>

    <!-- ===== DONE: Results ===== -->
    <AnalysisResult
      v-if="state === 'done' && result"
      :result="result!"
      :preview-url="previewUrl"
      :file-id="fileId"
      @reset="handleReset"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { Upload, Camera, Sparkles, Heart, Wand2, Share2, Download, ChevronRight, Users, Zap, Star, Brain } from 'lucide-vue-next';
import { analyzeCat, type CatAnalysisResult } from '../api/cat'
import { compressImage } from '../utils/image'

import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import SocialProofBar from '../components/SocialProofBar.vue'
import UploadButtons from '../components/UploadButtons.vue'
import ImagePreview from '../components/ImagePreview.vue'
import AnalyzingCard from '../components/AnalyzingCard.vue'
import AnalysisResult from '../components/AnalysisResult.vue'


// ===== State machine =====
type PageState = 'idle' | 'preview' | 'analyzing' | 'done'
const state = ref<PageState>('idle')

// ===== Image data =====
const previewUrl = ref('')
const imageBase64 = ref('')

// ===== Result =====
const result = ref<CatAnalysisResult | null>(null)
const fileId = ref('')

// ===== File inputs =====
const cameraInputRef = ref<HTMLInputElement | null>(null)
const albumInputRef = ref<HTMLInputElement | null>(null)

// ===== Progress animation =====
const progressText = ref('')
const progress = ref(0)
const onlineCount = ref(0)

const progressTexts = [
  '🔍 正在扫描喵星密码...',
  '✨ 解析猫咪灵魂频率...',
  '💫 连接喵星数据库...',
  '🎯 识别猫主子的真实身份...',
  '🔮 预测今日运势中...',
  '⭐ 生成专属档案...'
]
let progressTimer: ReturnType<typeof setInterval> | null = null
let textIndex = 0

function startProgress() {
  progress.value = 0
  textIndex = 0
  progressText.value = progressTexts[0] || ''
  onlineCount.value = Math.floor(Math.random() * 31) + 20

  progressTimer = setInterval(() => {
    if (progress.value < 85) {
      progress.value += Math.random() * 3 + 1
    } else if (progress.value < 96) {
      progress.value += Math.random() * 0.5 + 0.1
    }
    progress.value = Math.min(progress.value, 96)

    if (Math.random() < 0.2) {
      textIndex = (textIndex + 1) % progressTexts.length
      progressText.value = progressTexts[textIndex] || ''
    }

    if (Math.random() < 0.08) {
      onlineCount.value = Math.floor(Math.random() * 31) + 20
    }
  }, 250)
}

function stopProgress() {
  if (progressTimer) {
    clearInterval(progressTimer)
    progressTimer = null
  }
}

onUnmounted(() => stopProgress())

// ===== Helpers =====
function generateFileId(): string {
  return 'CAT' + Math.floor(Math.random() * 100000000).toString().padStart(8, '0')
}

// ===== Handlers =====
function handleCameraClick() {
  if (state.value === 'analyzing') return
  cameraInputRef.value?.click()
}

function handleAlbumClick() {
  if (state.value === 'analyzing') return
  albumInputRef.value?.click()
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
  startProgress()

  try {
    const res = await analyzeCat(imageBase64.value)
    progress.value = 100
    await new Promise((r) => setTimeout(r, 400))
    result.value = res
    fileId.value = generateFileId()
    state.value = 'done'
  } catch (err) {
    toast.show({
      message: err instanceof Error ? err.message : '识别失败，请稍后重试',
    })
    state.value = 'preview'
  } finally {
    stopProgress()
  }
}

function handleReset() {
  state.value = 'idle'
  previewUrl.value = ''
  imageBase64.value = ''
  result.value = null
  fileId.value = ''
}
</script>

