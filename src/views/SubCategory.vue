<template>
    <div>
        <Header/>
        <NavigationBar/>
        <div class="list-content" v-if="categoryList && categoryList[0] && categoryList[0].sub">
            <div class="content-item" v-for="item in categoryList[0].sub" :key="item.name">
                <img :src="item.image" alt="sub category image">
                <a :href="`${categoryList[0].slug}/${item.slug}`">{{item.name}}</a>
            </div>
        </div>
        <div class="fallback-content" v-else>
            <p>Sub Category Page</p>
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
<style lang="scss" scoped>
    .list-content{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        img{
            border-radius: 50px;
            width: 250px;
            height: 250px;
        }
    }
    .content-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        a{
            text-decoration: none;
            color: black;
            padding: 10px 0px;
            &:hover{
                text-decoration: underline;
            }
        }
    }
</style>