<script setup lang="ts">
import ActionButtons from './ActionButtons.vue'
import Card from './Card.vue';

const props = defineProps<{
  src: string
  rarity: '普通' | '稀有' | '史诗' | '传说'
  nickname: string
  fileId: string
  cutenessScore: number
}>()

const rarityColors = {
  '普通': 'from-gray-400 to-gray-500',
  '稀有': 'from-blue-400 to-blue-500',
  '史诗': 'from-purple-400 to-purple-600',
  '传说': 'from-yellow-400 to-orange-500'
};


</script>

<template>
  <Card>
    <div class="relative">
      <img :src="src" class="w-full aspect-[4/3] block object-cover" />
      <div class="absolute bottom-0 left-0 right-0 pt-10 pb-3.5 px-4 bg-gradient-to-t from-black/65 to-transparent flex items-end justify-between">
        <div class="flex flex-col gap-1">
          <div :class="`bg-gradient-to-r ${rarityColors[rarity]} mb-2 w-fit px-[10px] py-[2px] text-[12px] font-semibold rounded-xl text-white`">
            {{ rarity }}
          </div>
          <h2 class="text-xl font-bold text-white m-0">{{ nickname }}</h2>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-[32px] font-extrabold text-white leading-none">{{ cutenessScore }}</span>
          <span class="text-[11px] text-white/80">可爱值</span>
        </div>
      </div>
    </div>
    <ActionButtons />
  </Card>
</template>
