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
      Desarrollador por
      <a href="https://unsplash.com/" target="_blank">Punto Gráfico</a>.
    </p>
  </div>
</template>

<script>
import Flipbook from 'flipbook-vue'

export default {
  components: { Flipbook },
  data() {
    return {
      pages: [],
      pagesHiRes: [],
      hasMouse: true,
      pageNum: null,
    }
  },
  methods: {
    onFlipLeftStart(page) { console.log('flip-left-start', page) },
    onFlipLeftEnd(page) {
      console.log('flip-left-end', page);
      window.location.hash = '#' + page;
    },
    onFlipRightStart(page) { console.log('flip-right-start', page) },
    onFlipRightEnd(page) {
      console.log('flip-right-end', page);
      window.location.hash = '#' + page;
    },
    onZoomStart(zoom) { console.log('zoom-start', zoom) },
    onZoomEnd(zoom) { console.log('zoom-end', zoom) },
    setPageFromHash() {
      const n = parseInt(window.location.hash.slice(1), 10);
      if (isFinite(n)) this.pageNum = n;
    },
  },
  mounted() {
    window.addEventListener('keydown', (ev) => {
      const flipbook = this.$refs.flipbook;
      if (!flipbook) return;
      if (ev.keyCode == 37 && flipbook.canFlipLeft) flipbook.flipLeft();
      if (ev.keyCode == 39 && flipbook.canFlipRight) flipbook.flipRight();
    });

    // Simular carga asíncrona de páginas
    setTimeout(() => {
      this.pages = [
        null,
        'menus/prueba/hoja1.jpg',
        'menus/prueba/hoja2.jpg',
        'menus/prueba/hoja3.jpg',
        'menus/prueba/hoja4.jpg',

      ];
      this.pagesHiRes = [
        null,
        'menus/prueba/hoja1.jpg',
        'menus/prueba/hoja2.jpg',
        'menus/prueba/hoja3.jpg',
        'menus/prueba/hoja4.jpg',

      ];
    }, 1);

    window.addEventListener('hashchange', this.setPageFromHash);
    this.setPageFromHash();
  },
};
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
  gap: 15px; /* Espacio entre botones */
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