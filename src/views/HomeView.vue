<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
import pruebaFlipBook from '@/components/pruebaFlipBook.vue';
</script>

<template>
  <main>
    <NavigationBar />
      <pruebaFlipBook folder-name="antojitos" :page-count="5" />
   <h1>Hola</h1>
  </main>
</template>
