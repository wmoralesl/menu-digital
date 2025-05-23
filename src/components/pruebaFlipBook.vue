<template>
    <div class="actions">
        <button @click="prevPage" :disabled="currentPage === 0">⟵</button>
    <button @click="nextPage" :disabled="currentPage >= maxPage">⟶</button>
    </div>
  <div class="flipbook">
    

    <div class="pages">
      <img
        v-for="(pageNumber, index) in visiblePages"
        :key="index"
        :src="getImageUrl(pageNumber)"
        class="page"
        :alt="`Página ${pageNumber}`"
      />
    </div>

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

  // Primera página
  if (currentPage.value === 0) {
    return [1]
  }

  // Página final
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
</script>

<style scoped>
.actions{
    position: absolute;
}
.flipbook {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
}

.pages {
  display: flex;
  gap: 1rem;
}

.page {
  width: 200px;
  height: 280px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 767px) {
  .pages {
    flex-direction: column;
    align-items: center;
  }

  .page {
    width: 90vw;
    height: auto;
  }
}
</style>
