<template>
  <div class="container">
    <div class="controls">
      <button @click="flipPrev">← Anterior</button>
      [<span>{{ currentPage + 1 }}</span> de <span>{{ totalPages }}</span>]
      <button @click="flipNext">Siguiente →</button>
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
  pageFlip = new PageFlip(bookRef.value, {
    width: 612,
    height: 792,
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
  max-width: 700px;
  margin: auto;
}

.controls {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 14px;
}

.flip-book {
  width: 612px;
  height: 792px;
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
</style>
