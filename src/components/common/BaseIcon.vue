<script setup lang="ts">
import { computed } from "vue";

interface BaseIconProps {
  icon?: string;
  height?: number;
  width?: number;
  color?: string;
}

const { icon, height = 24, width = 24, color } = defineProps<BaseIconProps>();

const iconClasses = computed(() => {
  return ["base-icon", `icon-${icon}`];
});

const iconStyles = computed(() => {
  return {
    height: `${height}px`,
    width: `${width}px`,
    color,
  };
});
</script>

<template>
  <span :class="iconClasses" :style="iconStyles" role="img" />
</template>

<style scoped></style>
