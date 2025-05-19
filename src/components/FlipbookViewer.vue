<template>
  <flipbook class="flipbook" :pages="pages" />
</template>

<script>
import Flipbook from 'flipbook-vue'

export default {
  name: 'FlipbookViewer',
  components: {
    Flipbook
  },
  data() {
    return {
      pages: [
        'menus/antojitos/antojitos1.jpg',
        'menus/antojitos/antojitos2.jpg',
        'menus/antojitos/antojitos3.jpg',
        'menus/antojitos/antojitos4.jpg',
        'menus/antojitos/antojitos5.jpg'
      ]
    }
  }
}
</script>

<style>
.flipbook {
  width: 90vw;
  height: 90vh;
}
</style>
