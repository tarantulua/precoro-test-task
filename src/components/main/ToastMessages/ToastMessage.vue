<script setup lang="ts">
import BaseIcon from "@/components/common/BaseIcon.vue";
import { useToastMessages } from "@/composables/useToastMessages";
import type { ToastMessage } from "@/types/components";
import { computed } from "vue";

interface ToastMessageProps {
  toastMessage: ToastMessage;
}

const ToastMessageTypeIcon = {
  success: "success",
  error: "",
};

const ToastMessageTypeColor = {
  success: "#3FB34F",
  error: "",
};

const { toastMessage } = defineProps<ToastMessageProps>();

const { removeToastMessage } = useToastMessages();

const toastMessageSetting = computed(() => {
  const type = toastMessage.type ?? "success";
  return {
    icon: ToastMessageTypeIcon[type],
    color: ToastMessageTypeColor[type],
  };
});

const handleRemoveClick = () => {
  removeToastMessage(toastMessage.id);
};
</script>

<template>
  <div class="toast-message">
    <div
      class="toast-message__icon-container"
      :style="{
        borderColor: toastMessageSetting.color,
      }"
    >
      <BaseIcon
        :icon="toastMessageSetting.icon"
        :color="toastMessageSetting.color"
        :height="32"
        :width="32"
      />
    </div>

    <div class="toast-message__content">
      <div v-if="toastMessage.title" class="content__title">
        {{ toastMessage.title }}
      </div>

      <div v-if="toastMessage.text" class="content__text">
        {{ toastMessage.text }}
      </div>
    </div>

    <button class="toast-message__button" @click="handleRemoveClick">
      CLOSE
    </button>
  </div>
</template>

<style>
.toast-message {
  display: flex;
  background: white;
  box-shadow: 3px 3px 22px 0px rgba(0, 0, 0, 0.09);
  width: 100%;
  max-width: 26.25rem;
  border-radius: 0.25rem;
  overflow: hidden;
  pointer-events: all;

  .toast-message__icon-container {
    padding: 0.6875rem 0.5625rem;
    border-left: 4px solid;
  }

  .toast-message__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.25rem;
    flex: 1;
    padding: 0.5rem;
    font-size: 0.875rem;
    line-height: 1;

    .content__title {
      font-weight: 700;
      color: var(--text-color-main);
    }

    .content__text {
      color: var(--text-color-secondary);
    }
  }

  .toast-message__button {
    border: none;
    border-left: 1px solid var(--border-color-main);
    background: none;
    outline: none;
    cursor: pointer;
    transition: background-color var(--default-transition-duration) ease-in-out;
    font-size: 0.625rem;
    line-height: 1.2;
    color: var(--text-color-secondary);
    font-weight: 500;

    @media (hover) {
      &:hover {
        background-color: var(--border-color-main);
      }
    }
  }
}
</style>
