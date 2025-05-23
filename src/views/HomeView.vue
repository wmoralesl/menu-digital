<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
import pruebaFlipBook from '@/components/pruebaFlipBook.vue';
</script>

<template>
  <main>
    <NavigationBar />
      <pruebaFlipBook folder-name="prueba" :page-count="4" />
  </main>
</template>
