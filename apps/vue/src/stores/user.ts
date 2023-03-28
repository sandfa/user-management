import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore({
  id: "user", 
  state: () => ({
    users: [],
    user: null,
    loading: false,
    error: null
  }),
  getters: {
    getUsers: (state) => {
      return state.users
    },
    getUserById: (state) => {
      return (userId:string) => state.users.filter((user:any) => user.userid === userId)
    }
  },
  actions: {
    async fetchUsers() {
      this.users = []
      this.loading = true
      try {

        const data = await fetch('http://localhost:8012/user/get-all-users')
        .then((response) => response.json())
        this.users = data

      } catch(error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async fetchUserById(id:string) {
      const userid = id
      this.user = null
      this.loading = true
      try {

        const data = await fetch('http://localhost:8012/user/get-user/' + id)
        .then((response) => response.json())
        this.user = data

      } catch(error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async updateUserById(updatedUser:any) {
      this.loading = true
      try {
        await axios.put('http://localhost:8012/user/put-user', updatedUser)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async createNewUser(firstname:string, lastname:string, mail:string) {
      this.loading = true
      try {
        const newUser = {
          firstname: firstname,
          lastname: lastname,
          mail: mail
        }
        console.log(newUser)
        await axios.post('http://localhost:8012/user/post-user', newUser)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async deleteUserById(userid:string) {
      this.loading = true
      try {
        await axios.delete('http://localhost:8012/user/delete-user', { data: { userid: userid} })
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
})
