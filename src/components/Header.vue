<template>
    <div class="ecom-header">
        <EcomLogo/>
        <div class="ecom-head-items">
            <div class="ecom-search-bar">
                <div class="ecom-search-textbox">
                    <input type="text">
                </div>
                <div class="header-icon">
                    <img class="large-icon" src="../../public/search.png" alt="">
                </div>
            </div>
            <div v-if="!isLoggedIn" class="header-icon" @click="navigate('/signin')">
                <img class="large-icon" src="../../public/profile.png" alt="">
            </div>
            <div v-else class="header-user">
                <div class="header-icon" @click="viewProfile">
                    <p>{{this.userName}}</p>
                    <img class="small-icon" src="../../public/up.png" alt="">
                </div>
                <div class="user-dropdown" v-if="this.openProfile" @click="logout">
                    <p>Logout</p>
                </div>
            </div>
            <div class="header-icon" @click="navigate(`/user/wishlist/${id}`)">
                <img class="large-icon" src="../../public/like.png" alt="">
            </div>
            <div class="header-icon">
                <img class="large-icon" src="../../public/cart.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import EcomLogo from './EcomLogo.vue';

export default {
    name:'Header-Component',
    data(){
        return{
            openProfile:false,
        }
    },
    components:{
        EcomLogo
    },
    computed: {
        ...mapGetters(["isLoggedIn"]),
        ...mapState({
            userName: (state) => (state.user && state.user.username) ? state.user.username : '',
            id: (state) => (state.user && state.user.id) ? state.user.id : '',
        })
    },
    methods:{
        ...mapMutations(["resetState", "removeToken"]),
        ...mapActions(["getWishlist"]),
        viewProfile(){
            const a = this.openProfile
            this.openProfile = !a;
        },
        logout(){
            this.resetState()
            this.removeToken()
        },
        async navigate(val){
            if(val.indexOf('wishlist')>-1){
                await this.getWishlist({id:this.id})
            }
            this.$router.push(val)
        }
    }
}
</script>
<style lang="scss" scoped>
    .ecom-header{
        display: flex;
        justify-content: space-between;
        margin: 10px 20px;
    }
    .ecom-head-items, .header-user{
        display: flex;
    }
    .ecom-search-bar{
        border: 1.5px solid black;
        width: 500px;
        border-radius: 5px;
        display: flex;
        margin: 0px 10px;
        padding: 2px;
        .ecom-search-textbox{
            width: 470px;
            display: flex;
            input{
                border: 0px;
                width: 100%;
                margin: 0px 5px;
                &:focus{
                    outline: none;
                }
            }
        }
    }
    .header-icon{
        display: flex;
        align-items: center;
        cursor: pointer;
        .large-icon{
            width: 30px;
            height: 30px;
            margin: 0px 10px 0px 10px;
        }
        .small-icon{
            width: 10px;
            height: 10px;
            margin: 0px 10px 0px 5px;
        }
        p{
            margin: 0px 10px 0px 10px;
        }
        &:hover{
            background-color: #a4c0c4;
            border-radius: 10px;
        }
    }
    
    .user-dropdown{
        position: absolute;
        margin: 40px 0px 20px 0px;
        padding: 0px 20px;
        background-color: #4f686b;
        border-radius: 8px;
        color: white;
        p{
            cursor: pointer;
            padding: 5px;
            border-radius: 5px;
            &:hover{
                background-color: grey;
                color: black;
            }
        }
    }
</style>