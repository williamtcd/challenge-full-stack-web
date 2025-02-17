<script setup lang="ts">
import Appbar from '@/components/Appbar.vue'
</script>

<template>
  <v-layout class="default-layout">
    <Appbar />
    <v-main style="background-color: #ADAAA9" class="pb-10">
      <slot />
    </v-main>
  </v-layout>
</template>

<style scoped>
.default-layout {
  min-height: calc(100vh);
  background-color: #E2E4E5;
}
</style>