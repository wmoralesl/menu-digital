<template>
  <flipbook class="flipbook" :pages="pages" />
</template>

<script setup>
import Flipbook from 'flipbook-vue'
import { ref } from 'vue'

const pages = ref([
  'menus/antojitos/hoja1.jpg',
  'menus/antojitos/hoja2.jpg',
  'menus/antojitos/hoja3.jpg',
  'menus/antojitos/hoja4.jpg',
  'menus/antojitos/hoja5.jpg'
])
</script>

<style>
.flipbook {
  width: 90vw;
  height: 90vh;
}
</style>
