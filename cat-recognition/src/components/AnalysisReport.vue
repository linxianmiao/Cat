<script setup lang="ts">
import type { CatAnalysisResult } from '../api/cat'

defineProps<{
  result: CatAnalysisResult
}>()
</script>

<template>
  <div class="report-container">
    <div class="report-header">
      <h2 class="report-title">分析报告</h2>
      <span class="report-heart">❤️</span>
    </div>

    <div class="report-card">
      <div class="report-label">🐱 品种识别</div>
      <div class="report-value">{{ result.breed }}</div>
    </div>

    <div class="report-card">
      <div class="report-label">💕 可爱指数</div>
      <div class="cuteness-row">
        <div class="cuteness-track">
          <div class="cuteness-fill" :style="{ width: result.cutenessScore + '%' }"></div>
        </div>
        <span class="cuteness-num">{{ result.cutenessScore }}%</span>
      </div>
    </div>

    <div class="report-card">
      <div class="report-label">✨ 性格特征</div>
      <div class="tag-list">
        <span v-for="tag in result.personality" :key="tag" class="tag-item">{{ tag }}</span>
      </div>
    </div>

    <div class="report-card">
      <div class="report-label">😸 当前心情</div>
      <div class="report-value">{{ result.mood }}</div>
    </div>

    <div class="report-card">
      <div class="report-label">⭐ 特殊特征</div>
      <div class="feature-list">
        <p v-for="f in result.features" :key="f" class="feature-item">· {{ f }}</p>
      </div>
    </div>

    <div class="report-card fortune-card">
      <div class="report-label">🔮 今日运势</div>
      <div class="report-value">{{ result.fortune }}</div>
    </div>
  </div>
</template>

<style scoped>
.report-container {
  background: #fff;
  border-radius: 16px;
  padding: 20px 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.report-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.report-title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.report-heart {
  font-size: 20px;
}

.report-card {
  background: #f9f9fb;
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 10px;
}

.report-card:last-child {
  margin-bottom: 0;
}

.report-label {
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-bottom: 8px;
}

.report-value {
  font-size: 15px;
  color: #333;
  line-height: 1.6;
}

/* Cuteness */
.cuteness-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cuteness-track {
  flex: 1;
  height: 10px;
  background: #e8e8e8;
  border-radius: 5px;
  overflow: hidden;
}

.cuteness-fill {
  height: 100%;
  background: linear-gradient(90deg, #1a1a2e, #555);
  border-radius: 5px;
  transition: width 0.8s ease;
}

.cuteness-num {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  min-width: 42px;
  text-align: right;
}

/* Tags */
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  padding: 5px 14px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 13px;
  color: #555;
  background: #fff;
}

/* Features */
.feature-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.feature-item {
  font-size: 14px;
  color: #555;
  margin: 0;
  line-height: 1.7;
}

/* Fortune */
.fortune-card {
  background: linear-gradient(135deg, #f5f0ff, #ede5ff) !important;
}
</style>
