<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
    <header>
        <nav>
            <RouterLink class="link" to="/">Home</RouterLink>
            <RouterLink class="link" to="/antojitoselcentro">Antojitos</RouterLink>
            <RouterLink class="link" to="/prueba">Prueba</RouterLink>
             <RouterLink class="link" to="/flip">Correcto</RouterLink>
        </nav>
    </header>
</template>

<style>
.link{
    margin: 2px 12px;
  color: white;
}
</style>
