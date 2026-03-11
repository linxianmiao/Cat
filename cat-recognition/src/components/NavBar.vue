<template>
  <nav class="flex items-center justify-between px-4 py-3 bg-white border-b border-pink-50">
    <div class="flex items-center gap-1.5">
      <span class="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-sm">
        <Sparkles class="text-white w-3.5" />
      </span>
      <span class="text-[17px] font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">喵相馆</span>
    </div>
    <div class="text-[13px] text-gray-400 flex items-center">
      <Users class="w-3.5" />
      <span>1.2w在线</span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Sparkles, Users } from 'lucide-vue-next';
</script>
