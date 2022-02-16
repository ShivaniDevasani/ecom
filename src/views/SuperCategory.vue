<template>
    <div>
        <Header/>
        <NavigationBar/>
        <div class="list-content">
            <p>Super Category Page</p>
        </div>
        <Footer/>
    </div>
</template>
<script>
import commonComponents from "../mixins/commonComponents"
import categoryDetails from "../mixins/categoryDetails"

export default {
    mixins:[commonComponents,categoryDetails],
}
</script>