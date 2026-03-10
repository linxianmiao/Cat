<script setup lang="ts">
const emit = defineEmits<{
  click: []
}>()

function handleClick() {
  emit('click')
}
</script>

<template>
  <section class="upload-section" @click="handleClick">
    <div class="upload-zone">
      <div class="upload-icon-wrap">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
          <rect x="2" y="6" width="20" height="14" rx="2" stroke="#9b59b6" stroke-width="1.5" />
          <circle cx="12" cy="13" r="3.5" stroke="#9b59b6" stroke-width="1.5" />
          <path d="M7.5 6L9 3.5H15L16.5 6" stroke="#9b59b6" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </div>
      <p class="upload-text">点击上传猫咪照片</p>
      <p class="upload-hint">支持 JPG、PNG 格式</p>
      <button class="btn-gradient btn-upload" @click.stop="handleClick">
        <span class="btn-upload-icon">⇧</span>
        选择照片
      </button>
    </div>
  </section>
</template>

<style scoped>
.upload-section {
  cursor: pointer;
}

.upload-zone {
  background: #fff;
  border: 2px dashed #ffc0cb;
  border-radius: 16px;
  padding: 36px 20px 28px;
  text-align: center;
  transition: border-color 0.2s, background 0.2s;
}

.upload-section:hover .upload-zone {
  border-color: #ff9ab5;
  background: #fff8fa;
}

.upload-icon-wrap {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #f3e8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
}

.upload-text {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px;
}

.upload-hint {
  font-size: 13px;
  color: #aaa;
  margin: 0 0 20px;
}

.btn-gradient {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  background: linear-gradient(90deg, #ff6b9d, #c471ed);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-gradient:active {
  opacity: 0.85;
}

.btn-upload {
  padding: 10px 28px;
  font-size: 14px;
  border-radius: 24px;
}

.btn-upload-icon {
  font-size: 13px;
}
</style>
