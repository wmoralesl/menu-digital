<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
    <header>
        <nav>
            <RouterLink class="link" to="/">Home</RouterLink>
            <RouterLink class="link" to="/antojitoselcentro">Antojitos</RouterLink>
            <RouterLink class="link" to="/prueba">Prueba</RouterLink>
        </nav>
    </header>
</template>

<style>
.link{
  color: white;
}
</style>
