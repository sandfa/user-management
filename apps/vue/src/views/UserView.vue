<script setup>
  import { useRoute } from 'vue-router'
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useUserStore } from '../stores/user'

  const route = useRoute()
  const { user, loading, error } = storeToRefs(useUserStore())
  const { fetchUserById, updateUserById, deleteUserById } = useUserStore()

  fetchUserById(route.params.id)

  const test = ref("Hello World")

  function updateUser() {
    updateUserById(user.value)
  }

  function deleteUser() {
    deleteUserById(user.value.userid)
    redirect: to => "/users"
  }

</script>

<template>
  <main>
    <p v-if="loading">Loading posts...</p>
    <p v-if="error">{{ error.message }}</p>
    <p v-if="user">
      
      <p>userid: {{ user.userid }}</p>
      <p>firstname: <input v-model="user.firstname"></p>
      <p>lastname: <input v-model="user.lastname"></p>
      <p>mail: <input v-model="user.mail"></p>
      <button @click="updateUser">update</button>
      <button @click="deleteUser">delete</button>
      
      <!-- <p>{{ test }}</p>
      <input v-model="test">   -->
    </p>
  </main>


</template>