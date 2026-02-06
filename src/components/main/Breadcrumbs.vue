<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import BaseIcon from "../common/BaseIcon.vue";

const route = useRoute();

const breadcrumbs = computed(() => {
  return route.matched.filter((item) => item.meta && item.meta.breadcrumb);
});
</script>

<template>
  <nav class="breadcrumb-container">
    <div
      v-for="(crumb, index) in breadcrumbs"
      :key="index"
      class="breadcrumb-container__item"
    >
      <span v-if="index === breadcrumbs.length - 1" class="item__current-page">
        {{ crumb.meta.breadcrumb }}
      </span>

      <router-link v-else :to="crumb.path">
        {{ crumb.meta.breadcrumb }}
      </router-link>

      <BaseIcon
        v-if="index < breadcrumbs.length - 1"
        class="item__separator"
        icon="chevron"
      />
    </div>
  </nav>
</template>

<style>
.breadcrumb-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  .breadcrumb-container__item {
    display: flex;
    gap: 0.5rem;
    color: #fff;
    font-weight: 500;
    align-items: center;

    a {
      text-decoration: none;
      color: white;
    }

    .item__separator {
      rotate: -90deg;
    }
  }
}
</style>
