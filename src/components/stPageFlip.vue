<template>
  <div class="container">
    <div class="controls">
      <button @click="flipPrev">&#60;</button>
      <span>Página {{ currentPage + 1 }} de {{ totalPages }}</span>
      <button @click="flipNext">&#62;</button>
    </div>

    <div class="flip-book" ref="bookRef">
      <div class="page page-cover page-cover-top" data-density="hard">
        <div class="page-content">
          <h2>MENÚ</h2>
        </div>
      </div>
      <div
        v-for="(page, index) in pages"
        :key="index"
        class="page"
      >
        <div
          class="page-image"
          :style="{ backgroundImage: `url(${page})` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, defineProps } from 'vue'
import { PageFlip } from 'page-flip'

const props = defineProps({
  folderName: { type: String, default: 'antojitos' },
  pageCount: { type: Number, default: 4 }
})

const bookRef = ref(null)
let pageFlip = null

const pages = computed(() =>
  Array.from({ length: props.pageCount }, (_, i) => `menus/${props.folderName}/hoja${i + 1}.jpg`)
)

const currentPage = ref(0)
const totalPages = ref(0)

const flipNext = () => pageFlip?.flipNext()
const flipPrev = () => pageFlip?.flipPrev()

onMounted(() => {
  const isMobile = window.innerWidth < 768
  const width = isMobile ? 300 : 612
  const height = isMobile ? 400 : 792

  pageFlip = new PageFlip(bookRef.value, {
    width,
    height,
    size: 'fixed',
    showCover: false,
    maxShadowOpacity: 0.5,
    mobileScrollSupport: false
  })

  pageFlip.loadFromHTML(bookRef.value.querySelectorAll('.page'))
  totalPages.value = pageFlip.getPageCount()

  pageFlip.on('flip', (e) => {
    currentPage.value = e.data
  })
})

onBeforeUnmount(() => {
  pageFlip?.destroy()
})
</script>

<style scoped>
.container {
  max-width: 100%;
  padding: 10px;
  margin: auto;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;
}

.controls button {
   font-size: 14px;
    color: #333;
  padding: 5px 10px;
  border: 1px solid #6d6d6d;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.flip-book {
  margin: auto;
}

.page {
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.page-image {
  height: 100%;
  background-size: cover;
  background-position: center;
}

.page-cover-top .page-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 24px;
  font-weight: bold;
  background: #f2f2f2;
}


</style>
