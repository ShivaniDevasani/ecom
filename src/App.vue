<template>
  <div id="app">
    <router-view/>
    <AlertList/>
  </div>
</template>

<script>
import { mapMutations,mapActions,mapState } from "vuex";
import axios from 'axios';
import AlertList from './components/AlertList.vue'

export default {
  name: 'App',
  components:{
    AlertList
  },
  computed:{
    ...mapState(["products","user"])
  },
  async mounted(){
    await this.verifyUser()
    const params = this.$route.params
    if(params.cat && params.subcat && params.supercat && params.type){
      await this.getProducts(params)
      await this.wishlistItems()
    }
    if(params.id){
      await this.getWishlist({id:params.id})
    }
  },
  methods:{
    ...mapMutations(["setUser", "setToken"]),
    ...mapActions(["getProducts","getWishlist","wishlistItems"]),
    async verifyUser(){
      const token = localStorage.getItem('user')
      if(token){
      const response = await axios.post("http://localhost:3000/verify", 
        {
          token: token
        },
        {
        "Content-Type": "application/json",
        }
      );
      const user= response.data
      this.setUser(user);
      this.setToken(token);
      }
    },
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  body{
    margin: 0;
  }
</style>
