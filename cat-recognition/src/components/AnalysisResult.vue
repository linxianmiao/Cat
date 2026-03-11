<script setup lang="ts">
import type { CatAnalysisResult } from '../api/cat'
import CatProfileCard from './CatProfileCard.vue'
import MbtiCard from './MbtiCard.vue'
import SocialScoreBar from './SocialScoreBar.vue'
import FortuneCard from './FortuneCard.vue'
import Card from './Card.vue'

defineProps<{
  result: CatAnalysisResult
  previewUrl: string
  fileId: string
}>()

const emit = defineEmits<{
  reset: []
}>()
</script>

<template>
  <div class="flex flex-col gap-3.5 px-4 pt-4 pb-8">
    <CatProfileCard :src="previewUrl" :rarity="result.rarity" :nickname="result.nickname" :file-id="fileId"
      :cuteness-score="result.cutenessScore" />
    <MbtiCard :mbti="result.mbti" />
    <Card class="bg-white py-[18px] px-4">
      <!-- Breed -->
      <div>
        <div class="flex items-center mb-3">
          <span class="text-2xl mr-2">🐱</span>
          <h3 class="text-lg font-semibold">品种识别</h3>
        </div>
        <p class="ml-10 text-gray-700">{{ result.breed }}</p>
      </div>

      <div class="h-px bg-gray-100 my-4" />
      <!-- Personality -->
      <div>
        <div class="flex items-center mb-3">
          <span class="text-2xl mr-2">✨</span>
          <h3 class="text-lg font-semibold">性格档案</h3>
        </div>
        <div class="ml-10 flex flex-wrap gap-2">
          <span v-for="tag in result.personality" :key="tag"
            class="py-1 px-3.5 border border-gray-300 rounded-[20px] text-[13px] text-gray-600 bg-white">
            {{ tag }}
          </span>
        </div>
      </div>

      <div class="h-px bg-gray-100 my-4" />
      <!-- Mood -->
      <div>
        <div class="flex items-center mb-3">
          <span class="text-2xl mr-2">😸</span>
          <h3 class="text-lg font-semibold">当前状态</h3>
        </div>
        <p class="ml-10 text-gray-700">{{ result.mood }}</p>
      </div>

      <div class="h-px bg-gray-100 my-4" />

      <SocialScoreBar :score="result.socialScore" />

      <!-- Features -->
      <div>
        <div class="flex items-center mb-3">
          <span class="text-2xl mr-2">⭐</span>
          <h3 class="text-lg font-semibold">特殊特征</h3>
        </div>
        <div class="flex flex-col gap-0.5 ml-10">
          <p 
            v-for="f in result.features" 
            :key="f"
            class="text-sm text-gray-700 m-0 leading-[1.7]"
          >
            ▸ {{ f }}
          </p>
        </div>
      </div>
    </Card>

    <FortuneCard :fortune="result.fortune" :owner-tip="result.ownerTip" />

    <button
      class="w-full py-[15px] px-6 inline-flex items-center justify-center gap-1.5 border-none bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold text-base rounded-xl cursor-pointer transition-opacity duration-200 active:opacity-85"
      @click="emit('reset')">
      📷 再测一只猫
    </button>
    <p class="text-xs text-gray-300 text-center m-0">🌹 每只猫咪都是独一无二的存在</p>
  </div>
</template>
