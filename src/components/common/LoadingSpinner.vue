<script setup lang="ts">
interface LoadingSpinnerProps {
  size?: number;
  isShown: boolean;
}

const { size = 1.75, isShown } = defineProps<LoadingSpinnerProps>();
</script>

<template>
  <Transition name="fade">
    <div v-if="isShown" class="loading-spinner-container">
      <div class="loading-spinner-container__background" />
      <span
        class="loading-spinner-container__spinner"
        :style="{
          '--spinner-size': `${size}rem`,
        }"
      />
    </div>
  </Transition>
</template>

<style scoped>
.loading-spinner-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;

  .loading-spinner-container__background {
    height: 100%;
    width: 100%;
    background-color: #000;
    opacity: 0.05;
  }

  .loading-spinner-container__spinner {
    position: absolute;
    height: var(--spinner-size);
    width: var(--spinner-size);
    aspect-ratio: 1/1;
    border: 2px solid #2e3985;
    border-radius: 50%;
    border-right-color: var(--background-color-light);

    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
