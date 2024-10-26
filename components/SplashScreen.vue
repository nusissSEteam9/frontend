<template>
  <div class="splash-screen" :class="{ 'slide-out': slideOut }" v-if="visible">
    <h1 class="title">HEALTHIER RECIPES</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const visible = ref(true);
const slideOut = ref(false);

onMounted(() => {
  // 2秒后开始滑动离场动画
  setTimeout(() => {
    slideOut.value = true;
  }, 2000); // 开屏动画持续时间

  // 3秒后隐藏组件
  setTimeout(() => {
    visible.value = false;
  }, 3000); // 离场动画结束时间
});
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.5s ease;
  overflow: hidden;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  color: transparent;
  background-image: linear-gradient(to right, #2c7a7b, #6fd6ce);
  background-clip: text;
  -webkit-background-clip: text;
  animation:
    textAppear 2s ease forwards,
    scaleUp 2s ease forwards;
}

/* 文字逐字出现效果 */
@keyframes textAppear {
  0% {
    opacity: 0;
    letter-spacing: 20px;
  }
  50% {
    opacity: 1;
    letter-spacing: 5px;
  }
  100% {
    opacity: 1;
    letter-spacing: normal;
  }
}

/* 文字缩放效果 */
@keyframes scaleUp {
  0% {
    transform: scale(0.5) rotate(-15deg);
  }
  50% {
    transform: scale(1.1) rotate(15deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

/* 滑动离场动画 */
@keyframes slideOut {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}

.slide-out {
  animation: slideOut 1s ease forwards; /* 1秒滑动离场 */
}
</style>
