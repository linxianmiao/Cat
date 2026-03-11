<script setup lang="ts">
defineProps<{
  score: number
}>()
</script>

<template>
  <div class="py-1">
    <div class="flex items-center mb-3">
      <span class="text-2xl mr-2">💕</span>
      <h3 class="text-lg font-semibold">社交指数</h3>
    </div>
    <div class="ml-10 space-y-2">
      <div class="flex items-center space-x-3">
        <div class="h-2.5 bg-gray-200 rounded-[5px] overflow-hidden mb-1.5 w-full">
          <div
            class="h-full bg-gradient-to-r from-gray-900 to-gray-500 rounded-[5px] transition-[width] duration-800 ease-out"
            :style="{ width: score + '%' }"></div>
        </div>
        <span class="text-sm font-medium text-pink-500">{{ score }}/100</span>
      </div>
      <p class="text-xs text-gray-500">超越了{{ score }}%的喵星人</p>
    </div>
    <div class="h-px bg-gray-100 my-4" />
  </div>
</template>
