<script setup lang="ts">
import type { CatMbti } from '../api/cat'
import { Brain } from 'lucide-vue-next';
defineProps<{
  mbti: CatMbti
}>()

function dimensionColor(letter: string): string {
  const map: Record<string, string> = {
    'I': '#a855f7', 'E': '#a855f7',
    'N': '#22c55e', 'S': '#22c55e',
    'F': '#ec4899', 'T': '#ec4899',
    'J': '#f97316', 'P': '#f97316',
  }
  return map[letter] || '#999'
}
</script>

<template>
  <div class="p-5 rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
    <div class="flex items-start justify-between mb-3.5">
      <div class="flex items-center gap-2.5">
        <div class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
          <Brain class="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-800">MBTI 性格类型</h3>
          <p class="text-sm text-gray-600">{{ mbti.label }}</p>
        </div>
      </div>
      <span class="text-2xl font-bold text-indigo-600">{{ mbti.type }}</span>
    </div>

    <div v-if="mbti.dimensions?.length" class="flex flex-col gap-2">
      <div
        v-for="dim in mbti.dimensions"
        :key="dim.letter"
        class="flex items-center gap-3 p-3 px-3.5 bg-gray-50 rounded-lg"
      >
        <span
          class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
          :style="{ background: dimensionColor(dim.letter) }"
        >
          {{ dim.letter }}
        </span>
        <div class="flex flex-col gap-0.5">
          <span class="text-sm font-semibold text-gray-700">{{ dim.letter }} · {{ dim.name }}</span>
          <span class="text-xs text-gray-500">{{ dim.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
