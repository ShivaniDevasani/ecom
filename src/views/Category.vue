<template>
    <div>
        <Header/>
        <NavigationBar/>
        <div class="list-content">
            <p>Category Page</p>
        </div>
        <Footer/>
    </div>
</template>
<script>
import commonComponents from "../mixins/commonComponents"

export default {
    mixins:[commonComponents],
}
</script>