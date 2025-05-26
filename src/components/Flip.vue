<template>
  <div
    id="app"
    :class="{ 'has-mouse': hasMouse }"
    @touchstart="hasMouse = false"
  >
    <Flipbook
      class="flipbook"
      :pages="pages"
      :pagesHiRes="pagesHiRes"
      :startPage="pageNum"
      v-slot="flipbook"
      ref="flipbook"
      @flip-left-start="onFlipLeftStart"
      @flip-left-end="onFlipLeftEnd"
      @flip-right-start="onFlipRightStart"
      @flip-right-end="onFlipRightEnd"
      @zoom-start="onZoomStart"
      @zoom-end="onZoomEnd"
    >
      <div class="action-bar">
        <span
          class="btn left"
          :class="{ disabled: !flipbook.canFlipLeft }"
          @click="flipbook.flipLeft"
        >
          &#60;
        </span>
        <span
          class="btn plus"
          :class="{ disabled: !flipbook.canZoomIn }"
          @click="flipbook.zoomIn"
        >
          +
        </span>
        <span class="page-num">
          Página {{ flipbook.page }} de {{ flipbook.numPages }}
        </span>
        <span
          class="btn minus"
          :class="{ disabled: !flipbook.canZoomOut }"
          @click="flipbook.zoomOut"
        >
          -
        </span>
        <span
          class="btn right"
          :class="{ disabled: !flipbook.canFlipRight }"
          @click="flipbook.flipRight"
        >
          &#62;
        </span>
      </div>
    </Flipbook>
    <p class="credit">
      Desarrollado por
      <a href="https://puntografico.site/" target="_blank">Punto Gráfico</a>.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Flipbook from 'flipbook-vue'

const pages = ref([])
const pagesHiRes = ref([])
const hasMouse = ref(true)
const pageNum = ref(null)
const flipbook = ref(null)

const onFlipLeftStart = (page) => { console.log('flip-left-start', page) }
const onFlipLeftEnd = (page) => {
  console.log('flip-left-end', page)
}
const onFlipRightStart = (page) => { console.log('flip-right-start', page) }
const onFlipRightEnd = (page) => {
  console.log('flip-right-end', page)
}
const onZoomStart = (zoom) => { console.log('zoom-start', zoom) }
const onZoomEnd = (zoom) => { console.log('zoom-end', zoom) }

const setPageFromHash = () => {
  const n = parseInt(window.location.hash.slice(1), 10)
  if (isFinite(n)) pageNum.value = n
}

onMounted(() => {
  window.addEventListener('keydown', (ev) => {
    if (!flipbook.value) return
    if (ev.keyCode == 37 && flipbook.value.canFlipLeft) flipbook.value.flipLeft()
    if (ev.keyCode == 39 && flipbook.value.canFlipRight) flipbook.value.flipRight()
  })

  // Simular carga asíncrona de páginas
  setTimeout(() => {
    pages.value = [
      'menus/antojitos/hoja1.jpg',
      'menus/antojitos/hoja2.jpg',
      'menus/antojitos/hoja3.jpg',
      'menus/antojitos/hoja4.jpg',
    ]
    pagesHiRes.value = [
      'menus/antojitos/hoja1.jpg',
      'menus/antojitos/hoja2.jpg',
      'menus/antojitos/hoja3.jpg',
      'menus/antojitos/hoja4.jpg',
    ]
  }, 1)

  window.addEventListener('hashchange', setPageFromHash)
  setPageFromHash()
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333;
  color: #ccc;
  overflow: hidden;
}

a {
  color: inherit;
}

.action-bar {
  width: 100%;
  height: 30px;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.action-bar .btn {
  font-size: 14px;
  color: #999;
  padding: 5px 10px;
  border: 1px solid #666;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.has-mouse .action-bar .btn:hover {
  color: #ccc;
  background-color: #444;
  border-color: #999;
}

.action-bar .btn:active {
  transform: scale(0.98);
}

.action-bar .btn.disabled {
  color: #666;
  background-color: #333;
  border-color: #444;
  pointer-events: none;
  opacity: 0.5;
}

.action-bar .page-num {
  font-size: 12px;
  margin: 0 10px;
}

.flipbook .viewport {
  width: 90vw !important;
  height: calc(100vh - 50px - 40px) !important;
}

.flipbook .bounding-box {
  box-shadow: 0 0 20px #000;
}

.credit {
  font-size: 12px;
  line-height: 20px;
  margin: 10px;
}
</style>