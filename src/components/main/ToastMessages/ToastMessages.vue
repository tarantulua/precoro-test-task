<script setup lang="ts">
import { useToastMessages } from "../../../composables/useToastMessages";
import ToastMessage from "./ToastMessage.vue";

const { toastMessages } = useToastMessages();
</script>

<template>
  <TransitionGroup name="toast-list" tag="div" class="toast-messages">
    <ToastMessage
      v-for="toastMessage in toastMessages"
      :key="toastMessage.id"
      :toast-message="toastMessage"
    />
  </TransitionGroup>
</template>

<style>
.toast-messages {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.25rem;
  align-items: flex-end;
  position: relative;
  pointer-events: none !important;
}

.toast-list-enter-from,
.toast-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.toast-list-enter-active,
.toast-list-leave-active {
  transition: all 0.3s ease;
}

.toast-list-move {
  transition: transform 0.3s ease;
}

.toast-list-leave-active {
  position: absolute;
}
</style>
