<template>
  <div class="container">
    <div class="information">
      <!-- <button @click="flipPrev">&#60;</button> -->
      <span>Página {{ currentPage + 1 }} de {{ totalPages }}</span>
      <!-- <button @click="flipNext">&#62;</button> -->
    </div>

    <div class="flip-book" ref="bookRef">
      <div class="controls">
    <button>&#60;</button>
    <button>&#62;</button>
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
  const width = isMobile ? Math.min(window.innerWidth - 20, 500) : 612
  const height = isMobile ? Math.floor(width * 1.33) : 792

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
  position: relative;
}

.controls button {
  position: absolute;
  bottom: 10px;
  padding: 8px 12px;
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  border: 1px solid #6d6d6d;
  border-radius: 4px;
  cursor: default; /* no pointer cursor if they don’t do anything */
  pointer-events: none; /* prevent click */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.controls button:first-child {
  left: 10px;
}

.controls button:last-child {
  right: 10px;
}

.controls span {
  display: none; /* hide the page number if not needed */
}

.information{
  text-align: center;
  margin-bottom: 4px;
  font-size: small;
  color: #9b9b9b;
}

.flip-book {
  margin: auto;
  position: relative;
  width: fit-content;
}

.page {
  width: 100% !important; /* importante para sobrescribir el tamaño generado por PageFlip */
  height: 100% !important;
  max-width: 100%;
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

@media (max-width: 767px) {
  .flip-book {
    width: 100% !important;
  }

  .page {
    width: 95vw !important;
    height: auto ;
  }
}
</style>
