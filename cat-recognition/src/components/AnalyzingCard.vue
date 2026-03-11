<script setup lang="ts">
import { Wand2, Users } from 'lucide-vue-next';
import Card from './Card.vue';
defineProps<{
  text: string
  progress: number
  onlineCount: number
}>()
</script>

<template>
  <Card class="bg-white pt-7 pb-5 px-5 text-center ">
    <div class="text-[28px] mb-3 flex justify-center">
      <Wand2 class="text-purple-500 animate-spin" />
    </div>
    <p class="text-base font-semibold text-gray-700 m-0 mb-1.5">{{ text }}</p>
    <div class="h-2 bg-gray-200 rounded overflow-hidden mb-2">
      <div
        class="h-full bg-gradient-to-r from-gray-900 to-gray-500 rounded transition-[width] duration-400 ease-out"
        :style="{ width: Math.round(progress) + '%' }"
      ></div>
    </div>
    <p class="text-[13px] text-gray-500 m-0 mb-3.5">{{ Math.round(progress) }}%</p>
    <div class="h-px bg-gray-100 mb-3.5"></div>
    <p class="text-[12px] text-gray-500 m-0 flex justify-center items-center gap-[4px]">
      <Users class="w-[11px]"/>
      此刻有 {{ onlineCount }} 位铲屎官也在分析中...
    </p>
  </Card>
</template>
