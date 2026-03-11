<script setup lang="ts">
import { Camera, Upload } from 'lucide-vue-next';

defineEmits<{
  capture: []
  upload: []
}>()
</script>

<template>
  <div class="flex flex-col gap-2.5 mt-2">
    <button
      disabled="true"
      class="w-full py-[15px] px-6 border-none rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white text-base font-semibold cursor-pointer transition-opacity duration-200 flex items-center justify-center gap-1 active:opacity-85"
      @click="$emit('capture')"
    >
      <Camera class="w-[18px]" />
      拍摄猫咪照片
    </button>
    <button
      class="w-full py-[15px] px-6 border-2 border-dashed border-pink-200 rounded-xl bg-white text-pink-400 text-base font-medium cursor-pointer transition-colors duration-200 flex items-center justify-center gap-1 active:border-pink-300 active:bg-pink-50/50"
      @click="$emit('upload')"
    >
      <Upload class="w-[18px]" />
      从相册选择
    </button>
  </div>
</template>
