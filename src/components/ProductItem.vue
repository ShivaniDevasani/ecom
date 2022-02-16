<template>
    <div class="product-container">
        <div>
        <div class="best-seller" v-if="item.bestseller">
            <p>Best Seller</p>
        </div>
        <div class="header-icon">
            <img class="large-icon" :src="getIcon" alt="" @mouseover="overIcon" @mouseleave="leftIcon" @click="clickedIcon(item.id,item.name)">
        </div>
        <!-- <div class="cart-icon">
            <img class="large-icon" :src="cartIcon" alt="" @mouseover="overIcon" @mouseleave="leftIcon" @click="clickedIcon(item.id)">
        </div> -->
        </div>
        <img class="product-image" :src="item.image" alt="product image">
        <p>{{item.name.slice(0,40)}}...</p>
        <div class="product-cost-ratings">
            <Rating :rating="item.rating" :count="item.reviewscount"></Rating>
            <p class="current-cost">$ {{item.currentcost}}</p>
            <!-- <p class="actual-cost">$ {{item.actualcost}}</p> -->
        </div>
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import Rating from './Rating.vue'
import { EventBus } from '../event-bus';

export default {
    name: 'ProductItem',
    components:{
        Rating
    },
    data(){
        return{
            hover:false,
            clicked:false,
            // eslint-disable-next-line no-undef
            outlineicon: require("../../public/heart.png"),
            // eslint-disable-next-line no-undef
            solidicon: require("../../public/heart-red.png")
        }
    },
    props: {
        item: Object
    },
    computed:{
        ...mapState(["user"]),
        getIcon () {
            if (this.hover == true || this.item.wishlisted) {
                return this.solidicon
            } else {
                return this.outlineicon
            }
        },
        // cartIcon(){
        //     return require("../../public/cart.png")
        // }
    },
    methods:{
        ...mapActions(["updateWishlist","getWishlist"]),
        overIcon(){
            if(!this.item.wishlisted){
                this.hover = true
            }
        },
        leftIcon(){
            if(!this.item.wishlisted){
                this.hover = false
            }
        },
        clickedIcon(id,name){
            // eslint-disable-next-line vue/no-mutating-props
            this.item.wishlisted = !this.item.wishlisted
            //add or remove clicked id from user.wishlist and update wishlist json
            const token = localStorage.getItem('user')
            this.updateWishlist({
                itemId:id,
                userId:this.user.id,
                token: token
            })
            this.getWishlist({
                id:this.user.id
            })
            EventBus.$emit('added-to-wishlist',name,this.item.wishlisted);
            // this.clicked = !this.clicked
            // if (localStorage.getItem("favorites") === null) {
            //     localStorage.setItem("favorites",JSON.stringify([id]))
            // }
            // else{
            //     let list = JSON.parse(localStorage.getItem("favorites"))
            //     const index = list.indexOf(id)
            //     if(index>-1){
            //         list.splice(index, 1);
            //     }
            //     else{
            //         list.push(id)
            //     }
            //     localStorage.setItem("favorites",JSON.stringify(list))
            // }
        }
    }
}
</script>
<style lang="scss" scoped>
    .product-container{
        position: relative;
        border-radius: 10px;
        padding: 10px;
        margin: 10px;
        .product-image{
            width: 100%;
            height: 320px;
        }
    }
    .best-seller{
        position: absolute;
        margin: 5px 0;
        background-color: #4f686b;
        color: white;
        p{
            margin: 0;
            padding: 5px 10px;
        }
    }
    .header-icon{
        position: absolute;
        display: flex;
        align-items: center;
        cursor: pointer;
        right: 0;
        .large-icon{
            width: 30px;
            height: 30px;
            padding: 0px 10px 0px 10px;
        }
    }
    .product-cost-ratings{
        display: flex;
        align-items: center;
        justify-content: space-between;
        p{
            margin: 0 4px;
            font-size: 12px;
        }
        .actual-cost{
            text-decoration: line-through;
        }
    }
    // .cart-icon{
    //     position: absolute;
    //     display: flex;
    //     align-items: center;
    //     cursor: pointer;
    //     right: 0;
    //     bottom: 70px;
    //     .large-icon{
    //         width: 30px;
    //         height: 30px;
    //         padding: 0px 10px 0px 10px;
    //     }
    // }
</style>