<script setup lang="ts">
import { DuToastProvider } from 'dangoui'
import Index from './views/Index.vue'
</script>

<template>
  <DuToastProvider>
    <Index />
  </DuToastProvider>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
