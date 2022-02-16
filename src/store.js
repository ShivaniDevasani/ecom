import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    products:[],
    wishedProducts:[],
    pagetype:''
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      localStorage.setItem('user',token)
      state.token = token
    },
    resetState(state) {
      state.user = null
      state.token = null
      state.products = []
      state.wishedProducts = []
      //for local user get token of local user and set the products and wishedProducts from token.
    },
    removeToken(){
      localStorage.removeItem('user');
    },
    setProducts(state, list) {
      state.products = list;
    },
    setWishlist(state, list){
      state.wishedProducts = list
    },
    setPagetype(state, val) {
      state.pagetype = val
    }
  },
  actions: {
    async getProducts({commit},params){
      const {cat,group,subcat,supercat,type}=params
      const list = await axios.get(`http://localhost:3000/products?cat=${cat}&group=${group}&subcat=${subcat}&supercat=${supercat}&type=${type}`)
      commit('setProducts',list.data)
    },
    async updateWishlist({commit},params){
      const {itemId, userId, token} = params
      const response = await axios.post("http://localhost:3000/wishlist",
      {
        itemId: itemId,
        userId: userId,
        token: token
      },
      {
        "Content-Type": "application/json",
      }
      );
      const {updatedToken,user} = response.data
      commit('setToken',updatedToken)
      commit('setUser',user)
    },
    async getWishlist({commit},params){
      const {id} =  params
      const list = await axios.get(`http://localhost:3000/wish?id=${id}`)
      commit('setWishlist',list.data)
    },
    async wishlistItems({commit,state}){
      if(state.user){
      const wishlist = state.user.wishlist
      const result = state.products.map(product => {
        if(wishlist.indexOf(product.id)>-1){
          product.wishlisted = true
        }
        return product
      })
      commit('setProducts',result)
      }
    },
    async getCategoryPageDetails({commit},params){
      const {cat,group,subcat,supercat}=params
      let list = []
      if(supercat){
        if(group){
          if(cat){
            if(subcat){
              list = await axios.get(`http://localhost:3000/category?cat=${cat}&group=${group}&subcat=${subcat}&supercat=${supercat}`)
              commit('setPagetype','Sub Category')
              return list.data
            }
            else{
              list = await axios.get(`http://localhost:3000/category?cat=${cat}&group=${group}&supercat=${supercat}`)
              commit('setPagetype','Category')
              return list.data
            }
          }
          else{
            list = await axios.get(`http://localhost:3000/category?group=${group}&supercat=${supercat}`)
            commit('setPagetype','Category Group')
            return list.data
          }
        }
        else{
          list = await axios.get(`http://localhost:3000/category?supercat=${supercat}`)
          commit('setPagetype','Super Category')
          return list.data
        }
      }
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    getUser(state){
      return state.user
    }
  },
});