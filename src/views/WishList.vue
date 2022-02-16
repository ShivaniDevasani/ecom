<template>
    <div>
        <Header/>
        <NavigationBar/>
        <div class="products-grid">
            <div v-for="item in wishedProducts" :key="item.id">
                <ProductItem :item="item"/>
            </div>
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
        ...mapState(["wishedProducts"])
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