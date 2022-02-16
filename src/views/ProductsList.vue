<template>
    <div>
        <Header/>
        <NavigationBar/>
        <div v-if="products.length" class="products-grid">
            <div v-for="item in products" :key="item.id">
                <ProductItem :item="item"/>
            </div>
        </div>
        <div class="fallback-content" v-else>
            <p>Products list Page</p>
        </div>
        <Footer/>
    </div>
</template>
<script>
import {  mapState } from "vuex";
import commonComponents from "../mixins/commonComponents"
import ProductItem from '../components/ProductItem.vue'

export default {
    mixins:[commonComponents],
    components:{
        ProductItem
    },
    computed:{
        ...mapState(["products"])
    }
}
</script>
<style lang="scss" scoped>
    .products-grid{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        background-color: #749490;
        min-height: 100vh;
    }
</style>