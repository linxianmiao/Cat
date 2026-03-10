<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div class="analyzing-card">
    <p class="analyzing-title">🔮 AI正在分析中...</p>
    <div class="progress-track">
      <div class="progress-fill"></div>
    </div>
    <p class="analyzing-status">{{ text }}</p>
  </div>
</template>

<style scoped>
.analyzing-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px 20px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.analyzing-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px;
}

.progress-track {
  height: 8px;
  background: #e8e8e8;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 14px;
}

.progress-fill {
  height: 100%;
  width: 25%;
  background: linear-gradient(90deg, #1a1a2e, #444);
  border-radius: 4px;
  animation: slide 2s ease-in-out infinite;
}

@keyframes slide {
  0% {
    width: 10%;
    margin-left: 0;
  }
  50% {
    width: 35%;
    margin-left: 35%;
  }
  100% {
    width: 10%;
    margin-left: 90%;
  }
}

.analyzing-status {
  font-size: 13px;
  color: #aaa;
  margin: 0;
}
</style>
