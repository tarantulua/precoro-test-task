<script setup lang="ts">
interface InfoSectionProps {
  title?: string;
  text?: string;
  direction?: "row" | "column";
}

const { title, text, direction = "row" } = defineProps<InfoSectionProps>();
</script>

<template>
  <section
    class="info-section"
    :style="{
      flexDirection: direction,
    }"
  >
    <div class="info-section__info">
      <div v-if="title" class="info__title">
        <span>{{ title }}</span>

        <slot name="title" />
      </div>

      <div v-if="text" class="info__text">
        <span> {{ text }} </span>

        <slot name="text" />
      </div>
    </div>

    <slot />
  </section>
</template>

<style>
.info-section {
  padding: 1.5rem 1.5rem 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  .info-section__info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .info__title {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      color: var(--text-color-main);
      font-weight: 600;
      line-height: 1;
    }

    .info__text {
      font-size: 0.875rem;
      color: var(--text-color-secondary);
    }
  }
}
</style>
