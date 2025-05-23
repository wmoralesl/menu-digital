<template>
  <div class="flipbook-wrapper">
    <div class="actions">
      <button @click="prevPage" :disabled="currentPage === 0">⟵</button>
      <!-- <button @click="zoomOut" :disabled="zoomLevel <= 1">-</button>
      <button @click="zoomIn">+</button> -->
      <button @click="nextPage" :disabled="currentPage >= maxPage">⟶</button>
    </div>

    <div class="flipbook">
      <div class="pages">
        <img
          v-for="(pageNumber, index) in visiblePages"
          :key="index"
          :src="getImageUrl(pageNumber)"
          class="page"
          :style="imageStyle"
          :alt="`Página ${pageNumber}`"
        />
      </div>
    </div>
    <p class="credit">
      Desarrollado por
      <a href="https://puntografico.site/" target="_blank">Punto Gráfico</a>.
    </p>
  </div>
  
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  folderName: {
    type: String,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  }
})

const currentPage = ref(0)
const isMobile = ref(window.innerWidth < 768)
const zoomLevel = ref(1)

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

watch(() => props.pageCount, () => {
  currentPage.value = 0
})

const getImageUrl = (pageNumber) => {
  return `/menus/${props.folderName}/hoja${pageNumber}.jpg`
}

const visiblePages = computed(() => {
  const lastPage = props.pageCount
  if (isMobile.value) {
    return [currentPage.value + 1]
  }

  if (currentPage.value === 0) {
    return [1]
  }

  if (currentPage.value >= maxPage.value) {
    if (props.pageCount % 2 === 0) {
      return [props.pageCount]
    } else {
      return [props.pageCount - 1, props.pageCount]
    }
  }

  return [currentPage.value * 2, currentPage.value * 2 + 1]
})

const maxPage = computed(() => {
  if (isMobile.value) {
    return props.pageCount - 1
  }
  return Math.ceil((props.pageCount - 1) / 2)
})

const nextPage = () => {
  if (currentPage.value < maxPage.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 0) currentPage.value--
}

const zoomIn = () => {
  zoomLevel.value += 0.2
}

const zoomOut = () => {
  if (zoomLevel.value > 1) zoomLevel.value -= 0.2
}

const imageStyle = computed(() => ({
  transform: `scale(${zoomLevel.value})`,
  transition: 'transform 0.3s ease',
}))
</script>

<style scoped>
.flipbook-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.actions {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.flipbook {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.pages {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.page {
  width: 50vh;
  height: 70vh;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  transform-origin: center center;
  transition: transform 0.3s ease, opacity 0.3s ease;
  animation: fadeSlideIn 0.5s ease;
  opacity: 1;
}
/* Animación de entrada para las páginas */
@keyframes fadeSlideIn {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
/* Responsive */
@media (max-width: 767px) {
  .pages {
    flex-direction: column;
    align-items: center;
  }

  .page {
    width: 95vw;
    height: auto;
  }
}
.credit {
  font-size: 12px;
  line-height: 20px;
  margin: 10px;
}
</style>
