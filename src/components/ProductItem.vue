<template>
    <div class="product-container" @click="navigate(item.id)">
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
        <p class="product-name">{{`${item.name.slice(0,40)}${item.name.length>40 ? '...' : ''}`}}</p>
        <div class="product-cost-ratings">
            <Rating :rating="item.rating" :count="item.reviewscount"></Rating>
            <p class="current-cost">$ {{item.currentcost}}</p>
            <!-- <p class="actual-cost">$ {{item.actualcost}}</p> -->
        </div>
        <div class="product-tags">
            <Tag v-if="item.freeshipping" text="Free Shipping" type="shipping"></Tag>
            <Tag v-if="item.remaining < 6" :text="`Only ${item.remaining} left. Order soon!`" type="ordersoon"></Tag>
            <Tag v-if="item.handcrafted" text="Handcrafted" type="handcrafted"></Tag>
            <Tag v-if="item.organic" text="Organic" type="organic"></Tag>
            <Tag v-if="item.sustainable" text="Sustainably Sourced" type="sustainable"></Tag>
            <Tag v-if="item.nontoxic" text="Certified Nontoxic" type="certified"></Tag>
        </div>
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import Rating from './Rating.vue'
import { EventBus } from '../event-bus';
import Tag from './Tag.vue'

export default {
    name: 'ProductItem',
    components:{
        Rating,
        Tag
    },
    data(){
        return{
            hover:false,
            clicked:false,
            outlineicon: require("../../public/heart.png"),
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
        navigate(val){
            this.$router.push(`/product/${val}`)
        },
        clickedIcon(id,name){
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
        cursor: pointer;
        position: relative;
        border-radius: 10px;
        padding: 10px;
        margin: 10px;
        .product-image{
            width: 100%;
            height: 350px;
            object-fit: cover;
        }
    }
    .product-name{
        text-align: left;
    }
    .best-seller{
        position: absolute;
        margin: 5px 0;
        background-color: #4f686b;
        color: white;
        border-radius: 0 15px 15px 0;
        p{
            margin: 0;
            padding: 5px 10px;
            font-size: 12px;
        }
    }
    .header-icon{
        position: absolute;
        display: flex;
        align-items: center;
        cursor: pointer;
        right: 0;
        margin: 10px 20px;
        background-color: white;
        padding: 5px;
        border-radius: 50%;
        .large-icon{
            width: 30px;
            height: 30px;
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
    .product-tags{
        display: flex;
        flex-wrap: wrap;
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