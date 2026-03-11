<script setup lang="ts">
defineProps<{
  fortune: string
  ownerTip: string
}>()
</script>

<template>
  <div class="bg-gradient-to-br from-violet-600 to-purple-500 rounded-2xl py-[18px] px-4 text-white">
    <div class="text-[15px] font-bold mb-2.5">🔮 今日运势</div>
    <p class="text-sm leading-[1.7] m-0 mb-3 opacity-95">{{ fortune }}</p>
    <p v-if="ownerTip" class="text-[13px] leading-relaxed m-0 py-2.5 px-3 bg-white/15 rounded-[10px] opacity-90">
      铲屎官贴士：{{ ownerTip }}
    </p>
  </div>
</template>
