<template>
    <div class="ecom-content">
        <div class="content-item" v-for="item in navlist" :key="item.name">
            <img :src="item.image" alt="nav category image">
            <p>{{item.name}}</p>
        </div>
    </div>
</template>
<script>
import NavList from '../db/navigationData.json'

export default {
    data(){
        return{
            navlist: NavList.list,
        }
    },
}
</script>
<style lang="scss" scoped>
    .ecom-content{
        background-color: #749490;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        img{
            border-radius: 50%;
            width: 250px;
            height: 250px;
        }
    }
    .content-item{
        padding: 20px;
    }
</style>