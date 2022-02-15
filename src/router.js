import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'
import ProductsList from './views/ProductsList.vue'
import SuperCat from './views/SuperCategory.vue'
import WishList from './views/WishList.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes:[
        {
            path:'/',
            component:Home
        },
        {
            path:'/signin',
            component:SignIn,
            beforeEnter:(to, from, next)=>{
                const token = !!localStorage.getItem('user')
                if(token){
                    next('/')
                }else{
                    next()
                }
            }
        },
        {
            path:'/signup',
            component:SignUp,
            beforeEnter:(to, from, next)=>{
                const token = !!localStorage.getItem('user')
                if(token){
                    next('/')
                }else{
                    next()
                }
            }
        },
        {
            path:'/products/:supercat/:cat/:subcat/:type',
            component:ProductsList
        },
        {
            path:'/products/:supercat',
            component:SuperCat
        },
        {
            path:'/user/wishlist/:id',
            component:WishList
        }
    ]
})