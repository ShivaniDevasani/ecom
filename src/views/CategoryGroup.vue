<template>
    <div>
        <Header/>
        <NavigationBar/>
        <div class="list-content">
            <p>Category Group Page</p>
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