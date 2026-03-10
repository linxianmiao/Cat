<script setup lang="ts">
defineProps<{
  src: string
}>()
</script>

<template>
  <div class="image-wrap">
    <img :src="src" class="preview-image" />
  </div>
</template>

<style scoped>
.image-wrap {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.preview-image {
  width: 100%;
  display: block;
  object-fit: cover;
}
</style>
