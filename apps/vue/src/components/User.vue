<script setup>
  import { RouterLink } from 'vue-router'
  import { storeToRefs } from 'pinia'

  defineProps(['user'])
</script>

<template>
    <div>
        <RouterLink :to="`/user/${user.userid}`">{{ user.userid }}</RouterLink>
        <p>{{ user.firstname }} {{ user.lastname }} {{ user.mail }}</p>
        ------------------------------------------------------------
    </div>
</template>