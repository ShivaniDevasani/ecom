<template>
    <div>
        <Header/>
        <NavigationBar/>
        <div class="list-content product-content">
            <div class="product-images">
                <img :src="product.image" alt="product image">
            </div>
            <div class="product-details">
                <p class="product-name">{{product.name}}</p>
                <div class="product-cost">
                    <p class="current-cost">$ {{product.currentcost}}</p>
                    <p v-if="product.currentcost !== product.actualcost" class="actual-cost">$ {{product.actualcost}}</p>
                </div>
                <p v-if="product.discountpercentage > 0" class="cost-savings">You Save ${{product.actualcost - product.currentcost}} ({{product.discountpercentage}}%)</p>
                <p class="product-description">{{product.description}}</p>
                <div class="product-highlights">
                    <Tag v-if="product.freeshipping" text="Free Shipping" type="shipping"></Tag>
                    <Tag v-if="product.remaining < 6" :text="`Only ${product.remaining} left. Order soon!`" type="ordersoon"></Tag>
                    <Tag v-if="product.handcrafted" text="Handcrafted" type="handcrafted"></Tag>
                    <Tag v-if="product.organic" text="Organic" type="organic"></Tag>
                    <Tag v-if="product.sustainable" text="Sustainably Sourced" type="sustainable"></Tag>
                    <Tag v-if="product.nontoxic" text="Certified Nontoxic" type="certified"></Tag>
                </div>
                <div class="product-rating">
                    <Rating :rating="product.rating" :count="product.reviewscount"></Rating>
                </div>
                <div class="product-buttons">
                    <button>Add to Cart</button>
                    <div class="wishlist"></div>
                </div>
                <div class="view-reviews" @click="displayReviews">
                    <p>{{viewReviewText}}</p>
                    <div class="review-icon">
                        <img src="../../public/down-arrow.png" alt="">
                    </div>
                </div>
                <div v-if="showReviews" class="product-reviews">
                    <Review v-for="review in product.reviews" :key="review.text" :review="review"></Review>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>
<script>
import commonComponents from "../mixins/commonComponents"
import categoryDetails from "../mixins/categoryDetails"
import Tag from "../components/Tag.vue"
import Rating from "../components/Rating.vue"
import Review from "../components/Review.vue"
import {mapActions} from "vuex"

export default {
    mixins:[commonComponents,categoryDetails],
    components:{
        Tag,
        Rating,
        Review
    },
    data(){
        return{
            product:{},
            showReviews: true,
            viewReviewText: "Hide Reviews"
        }
    },
    methods:{
        ...mapActions(["getProductDetails"]),
        displayReviews(){
            if(!this.showReviews){
                this.viewReviewText = "Hide Reviews"
                this.showReviews = true
            }else{
                this.viewReviewText = "Show Reviews"
                this.showReviews = false
            }
            
        }
    },
    created(){
        const params = this.$route.params
        this.getProductDetails(params).then((res)=>{
            this.product = res[0]
        })
    }
}
</script>
<style lang="scss" scoped>
    .product-content{
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 50px 0 50px 0;
        .product-images{
            img{
                width: 70%;
                height: 350px;
                object-fit: cover;
            }
        }
        .product-details{
            padding: 0 50px;
            display: flex;
            align-items: baseline;
            flex-direction: column;
            .product-name{
                font-size: 25px;
            }
            .product-description{
                text-align: left;
                font-size: 14px;
                margin: 20px 0;
            }
            .cost-savings{
                font-size: 12px;
                color: green;
            }
            .product-highlights{
                display: flex;
                flex-wrap: wrap;
            }
            .product-rating{
                margin: 10px 0;
            }
            .product-buttons{
                width: 100%;
                display: flex;
                align-items: center;
                button{
                    width: 90%;
                    height: 40px;
                    background-color: black;
                    color: white;
                    font-size: 20px;
                    border: 0;
                    cursor: pointer;
                    border-radius: 10px;
                    &:hover{
                        -moz-box-shadow: 0px 0px 4px 1px grey;
                        -webkit-box-shadow: 0px 0px 4px 1px grey;
                        box-shadow: 0px 0px 4px 1px  grey;
                    }
                }
                .wishlist{
                    height: 36px;
                    width: 36px;
                    background-repeat: no-repeat;
                    background-size: cover;
                    margin-right: 5px;
                    background-image: url("../../public/like.png");
                    cursor: pointer;
                    margin: 0 10px;
                    border-radius: 10px;
                    border: 2px solid black;
                    &:hover{
                        background-image: url("../../public/heart-red.png");
                        -moz-box-shadow: 0px 0px 4px 1px grey;
                        -webkit-box-shadow: 0px 0px 4px 1px grey;
                        box-shadow: 0px 0px 4px 1px  grey;
                    }
                }
            }
            .product-cost{
                display: flex;
                align-items: baseline;
                .current-cost{
                    padding: 5px 20px 0 0;
                    font-size: 30px;
                    font-weight: 700;
                }
                .actual-cost{
                    padding: 5px 10px 0 0;
                    text-decoration: line-through;
                }
            }
            .view-reviews{
                cursor: pointer;
                padding: 20px 10px 0 10px;
                display: flex;
                align-items: center;
                .review-icon{
                    display: flex;
                    align-items: center;
                    margin-left: 8px;
                    img{
                        height: 15px;
                        width: 15px;
                    }
                }
            }
        }
    }
</style>