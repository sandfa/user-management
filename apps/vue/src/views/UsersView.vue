<script setup>
    import { RouterLink } from 'vue-router'
    import { ref } from 'vue'
    import { storeToRefs } from 'pinia'
    import { useUserStore } from '../stores/user'
    import User from '../components/User.vue'

    const { users, loading, error } = storeToRefs(useUserStore())
    const { fetchUsers, createNewUser } = useUserStore()

    fetchUsers()

    const newFirstname = ref('')
    const newLastname = ref('')
    const newMail = ref('')

    function createUser() {
        createNewUser(newFirstname.value, newLastname.value, newMail.value)
        fetchUsers()
    }

</script>

<template>
  <main>

    <p>firstname: <input v-model="newFirstname"></p>
    <p>lastname: <input v-model="newLastname"></p>
    <p>mail: <input v-model="newMail"></p>
    <button @click="createUser">create</button> <br>

    ------------------------------------------------------------ <br>
    ------------------------------------------------------------
    <p v-if="loading">Loading posts...</p>
    <p v-if="error">{{ error.message }}</p>
    <p v-if="users" v-for="user in users" :key="user.id">
      <user :user="user"></user>
    </p>
  </main>
</template>