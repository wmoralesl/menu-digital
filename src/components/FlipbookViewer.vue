<template>
  <flipbook
  class="flipbook"
  :pages="pages"
  :pagesInRange="[0, 0]"  
    :startPage="0" 
  />
</template>

<script setup>
import Flipbook from 'flipbook-vue'
import { ref, computed, defineProps } from 'vue'

const props = defineProps({
  folderName: {
    type: String,
    required: true,
    default: 'antojitos' // Valor por defecto si no se proporciona
  },
  pageCount: {
    type: Number,
    required: true,
    default: 5 // Valor por defecto si no se proporciona
  }
})

const pages = computed(() => {
  const pageArray = []
  for (let i = 1; i <= props.pageCount; i++) {
    pageArray.push(`menus/${props.folderName}/hoja${i}.jpg`)
  }
  return pageArray
})
</script>

<style>
.flipbook {
  width: 90vw;
  height: 90vh;
  margin: 0 auto;
}
</style>