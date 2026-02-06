<script setup lang="ts">
import Header from "@/components/main/Header.vue";
import ToastMessages from "@/components/main/ToastMessages/ToastMessages.vue";
</script>

<template>
  <Header />
  <main class="main">
    <RouterView />
  </main>

  <div id="modal-container">
    <ToastMessages />
  </div>
</template>

<style scoped>
.main {
  height: calc(100% - 2.5rem);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

#modal-container {
  height: 100dvh;
  width: 100dvw;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;

  & > * {
    pointer-events: all;
  }
}
</style>
