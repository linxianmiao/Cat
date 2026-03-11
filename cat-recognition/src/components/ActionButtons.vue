<script setup lang="ts">
import { Share2, Download } from 'lucide-vue-next';
</script>

<template>
  <div class="flex justify-center gap-[1px]">
    <button
      class="flex-1 flex items-center justify-center gap-1 py-2.5 bg-white transition-colors duration-200 active:bg-gray-50">
      <Share2 class="w-[14px] text-pink-500" /> 
      <span class="text-sm font-medium">分享</span>
    </button>
    <button
      class="flex-1 flex items-center justify-center gap-1 py-2.5 bg-white transition-colors duration-200 active:bg-gray-50">
      <Download class="w-[14px] text-purple-500" />
      <span class="text-sm font-medium">保存</span>
    </button>
  </div>
</template>
