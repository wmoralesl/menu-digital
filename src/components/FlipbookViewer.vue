<template>
  <div 
    id="flipbook-container"
    @touchstart.passive="handleTouchStart"
  >
    <flipbook
      class="flipbook"
      :pages="pages"
      :pagesInRange="[0, 0]"  
      :startPage="0" 
    />
  </div>
</template>

<script setup>
import Flipbook from 'flipbook-vue'
import { ref, computed, defineProps, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  folderName: {
    type: String,
    required: true,
    default: 'antojitos'
  },
  pageCount: {
    type: Number,
    required: true,
    default: 5
  }
})

const hasTouch = ref(false)

// Solo un manejador de eventos
const handleTouchStart = () => {
  hasTouch.value = true
}

// Elimina el event listener del onMounted para evitar duplicados
// O usa solo uno de los dos enfoques (template o addEventListener)

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