<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="navbar">
   <div>
     <nav>
       <RouterLink to="/">Home</RouterLink> - 
       <RouterLink to="/users">Users</RouterLink>
     </nav>
   </div>
 </header> 

 <RouterView />
</template>

<style scoped>
  .navbar {
    background-color: lightgreen;
    padding: 1.2rem;
  }
</style>
