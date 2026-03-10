<template>
  <header class="header">
    <div class="header-icon">
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
        <path
          d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z"
          fill="white"
          stroke="white"
          stroke-width="0.5"
        />
        <path
          d="M18 14L18.9 16.1L21 17L18.9 17.9L18 20L17.1 17.9L15 17L17.1 16.1L18 14Z"
          fill="white"
          stroke="white"
          stroke-width="0.3"
        />
      </svg>
    </div>
    <h1 class="header-title">猫咪面相分析</h1>
    <p class="header-subtitle">上传照片，探索喵星人的秘密✨</p>
  </header>
</template>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 28px;
}

.header-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e88bff, #c471ed, #a855f7);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
  box-shadow: 0 6px 24px rgba(196, 113, 237, 0.35);
}

.header-title {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(90deg, #ff6b9d, #c471ed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 6px;
}

.header-subtitle {
  font-size: 14px;
  color: #999;
  margin: 0;
}
</style>
