<template>
    <div class="ecom-header">
        <EcomLogo/>
        <div class="ecom-head-items">
            <div class="ecom-search-container">
                <div class="ecom-search-bar">
                    <div class="ecom-search-textbox">
                        <input class="searchbar-input" type="text" @keydown.down="selectSuggestionDown" @keydown.up="selectSuggestionUp" @keyup.enter="navigate(`/search/${search}`)" @input="updateInput">
                    </div>
                    <div class="search-icon">
                        <img class="large-icon" src="../../public/search.png" alt="">
                    </div>
                </div>
                <div class="ecom-search-suggestions" v-if="showSuggested" v-click-outside="onClickOutside">
                    <ul>
                        <li :class="{'selected-suggestion':index===selectedSuggestionIndex}" @mouseover="hoverSuggestion(item,index)" @click="navigate(`/search/${search}`)" v-for="(item,index) in suggested" :key="item">{{item}}</li>
                    </ul>
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
            suggested:[],
            showSuggested: false,
            selectedSuggestionIndex: -1,
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
            search: (state) => state.search,
        })
    },
    methods:{
        ...mapMutations(["resetState", "removeToken", "updateSearch"]),
        ...mapActions(["getWishlist","getSearchSuggestions"]),
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
        },
        updateInput(e) {
            let searchWord = e.target.value
            if(searchWord.length > 2){
                this.getSearchSuggestions(searchWord).then((res)=>{
                    this.suggested = res
                    this.showSuggested = true
                })
            }else{
                this.suggested = []
                this.showSuggested = false
            }
            this.updateSearch(searchWord)
        },
        onClickOutside() {
            this.showSuggested = false
            this.selectedSuggestionIndex = -1
        },
        hoverSuggestion(word,val){
            this.selectedSuggestionIndex = val
            this.updateSearch(word)
        },
        selectSuggestionDown(){
            if(this.selectedSuggestionIndex === (this.suggested.length - 1)){
                this.selectedSuggestionIndex = 0
            }
            else{
                this.selectedSuggestionIndex++
            }
            this.updateSearch(this.suggested[this.selectedSuggestionIndex])
        },
        selectSuggestionUp(){
            if(this.selectedSuggestionIndex <= 0){
                this.selectedSuggestionIndex = (this.suggested.length - 1)
            }
            else{
                this.selectedSuggestionIndex--
            }
            this.updateSearch(this.suggested[this.selectedSuggestionIndex])
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
    .ecom-search-suggestions{
        z-index: 20;
        position: absolute;
        background-color: #f5f5dc;
        width: 507px;
        text-align: left;
        -moz-box-shadow: 0px 0px 4px 1px grey;
        -webkit-box-shadow: 0px 0px 4px 1px grey;
        box-shadow: 0px 0px 4px 1px  grey;
        margin: 0px 10px;
        ul{
            list-style: none;
            padding: 0;
            li{
                margin-bottom: 5px;
                padding: 1px 20px;
                &:hover{
                    cursor: pointer;
                }
            }
        }
    }
    .selected-suggestion{
        background-color: white;
    }
    .header-icon{
        display: flex;
        align-items: center;
        cursor: pointer;
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
    .search-icon{
        display: flex;
        align-items: center;
    }
    .large-icon{
        width: 30px;
        height: 30px;
        margin: 0px 10px 0px 10px;
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