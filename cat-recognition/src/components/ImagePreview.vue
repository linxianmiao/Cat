<script setup lang="ts">
defineProps<{
  src: string
  showReselect?: boolean
}>()

defineEmits<{
  reselect: []
}>()
</script>

<template>
  <div class="relative rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
    <img :src="src" class="w-full block object-cover aspect-[4/3]" />
    <button
      v-if="showReselect"
      class="absolute top-3 right-3 py-1.5 px-4 bg-white/95 border-none rounded-[20px] text-sm font-medium text-gray-700 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
      @click="$emit('reselect')"
    >
      重选
    </button>
  </div>
</template>
