<script setup lang="ts">
import { computed } from "vue";
import BaseIcon from "./BaseIcon.vue";
import { ButtonShape, ButtonVariant } from "@/types/components";

interface ButtonProps {
  icon?: string;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  disabled?: boolean;
  type?: "submit" | "button";
}

const BUTTON_VARIANT_CLASS: Record<ButtonVariant, string> = {
  [ButtonVariant.DEFAULT]: "button--default",
  [ButtonVariant.CLEAR]: "button--clear",
};

const BUTTON_SHAPE_CLASS: Record<ButtonShape, string> = {
  [ButtonShape.DEFAULT]: "button--shape-default",
  [ButtonShape.ROUNDED]: "button--shape-rounded",
  [ButtonShape.SQUARE]: "button--shape-square",
};

const {
  icon,
  variant = ButtonVariant.DEFAULT,
  shape = ButtonShape.DEFAULT,
  disabled = false,
  type = "button",
} = defineProps<ButtonProps>();
const emit = defineEmits(["click"]);

const buttonClass = computed(() => {
  return [BUTTON_VARIANT_CLASS[variant], BUTTON_SHAPE_CLASS[shape]];
});
</script>

<template>
  <button
    class="button"
    :class="buttonClass"
    :disabled="disabled"
    :type="type"
    @click="emit('click')"
  >
    <BaseIcon v-if="icon" :icon="icon" />

    <span>
      <slot />
    </span>
  </button>
</template>

<style scoped>
.button {
  height: 100%;
  outline: none;
  box-shadow: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  gap: 0.5rem;

  transition: background-color var(--default-transition-duration) ease-in-out;

  @media (hover: hover) {
    &:not(:disabled) {
      &.button--default {
        &:hover {
          background-color: #2e3985;
        }
      }

      &.button--clear {
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }

  &.button--default {
    background-color: var(--text-color-main);
    color: white;

    &:disabled {
      background-color: var(--background-color-secondary);
    }
  }

  &.button--clear {
    background-color: transparent;
    color: #fff;
  }

  &.button--shape-default {
    border-radius: 0.5rem;
  }

  &.button--shape-square {
    border-radius: 0;
  }

  &.button--shape-rounded {
    border-radius: 3rem;
  }
}
</style>
