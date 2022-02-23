<template>
    <div>
        <Header/>
        <NavigationBar/>
        <ProductDetails/>
        <Footer/>
    </div>
</template>
<script>
import commonComponents from "../mixins/commonComponents"
import categoryDetails from "../mixins/categoryDetails"
import ProductDetails from "../components/ProductDetails.vue"
 
export default {
    mixins:[commonComponents,categoryDetails],
    components:{
        ProductDetails,
    },
}
</script>