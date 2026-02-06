<script setup lang="ts">
import { computed } from "vue";
import Button from "../common/Button.vue";
import Breadcrumbs from "./Breadcrumbs.vue";
import { ButtonShape, ButtonVariant } from "../../types/components";

const buttons = computed(() => {
  return [
    { id: 1, label: "Buy now", icon: "buy" },
    { id: 2, label: "Onboarding", icon: "onboarding" },
    { id: 3, label: "Help center", icon: "help-center" },
    {
      id: 4,
      label: "user@email.com",
      icon: "chevron",
    },
  ];
});
</script>

<template>
  <header class="site-header">
    <Breadcrumbs />

    <div class="site-header__buttons">
      <Button
        v-for="button in buttons"
        :key="button.id"
        :variant="ButtonVariant.CLEAR"
        :shape="ButtonShape.SQUARE"
        :icon="button.icon"
      >
        {{ button.label }}
      </Button>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(90deg, #161b40 0%, #2e3985 100%);
  height: var(--header-height);
  padding: 0.25rem 1rem 0.25rem 1.5rem;
  justify-content: space-between;
  box-shadow: 0px 16px 16px -16px #363e7180;

  .site-header__buttons {
    height: 100%;
    display: flex;
    gap: 0.25rem;
  }
}
</style>
