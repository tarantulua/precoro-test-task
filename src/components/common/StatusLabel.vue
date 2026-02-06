<script setup lang="ts">
import { computed } from "vue";
import BaseIcon from "./BaseIcon.vue";

interface StatusLabelProps {
  isEnabled: boolean;
  disabledText: string;
  enabledText: string;
}

const { isEnabled, enabledText, disabledText } =
  defineProps<StatusLabelProps>();

const statusLabelSetting = computed(() => {
  return {
    color: isEnabled ? "#00A338" : "#5E6A75",
    icon: isEnabled ? "mark" : "cross",
    text: isEnabled ? enabledText : disabledText,
    background: isEnabled ? "#E1F6E9" : "#EEF0F6",
  };
});
</script>

<template>
  <div
    class="status-label"
    :style="{
      color: statusLabelSetting.color,
      backgroundColor: statusLabelSetting.background,
    }"
  >
    <BaseIcon :icon="statusLabelSetting.icon" :height="8" :width="8" />

    <span>{{ statusLabelSetting.text }}</span>
  </div>
</template>

<style>
.status-label {
  display: flex;
  width: max-content;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.3125rem 0.5rem;
  border-radius: 1.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 0.625rem;
  transition:
    background-color 200ms ease-in,
    color 200ms ease-in;
}
</style>
