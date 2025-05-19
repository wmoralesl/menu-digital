<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>


      <nav>
        <RouterLink class="link" to="/">Home</RouterLink>
        <RouterLink class="link" to="/antojitoselcentro">Antojitos</RouterLink>
        <RouterLink class="link" to="/paisajes">Paisajes</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<style>
.link{
  color: white;
}
</style>


