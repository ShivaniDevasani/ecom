<template>
    <div class="ecom-content">
        <div class="content-item" v-for="item in navlist" :key="item.name">
            <img @click="navigate(item.slug)" :src="item.image" alt="nav category image">
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
    methods:{
        navigate(link){
            this.$router.push(`/products/${link}`); 
        },
    }
}
</script>
<style lang="scss" scoped>
    .ecom-content{
        background-color: #d5e9e6;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        img{
            border-radius: 50%;
            width: 250px;
            height: 250px;
            cursor: pointer;
            &:hover{
                -moz-box-shadow: 0px 0px 20px 5px grey;
                -webkit-box-shadow: 0px 0px 20px 5px grey;
                box-shadow: 0px 0px 20px 5px  rgb(128, 128, 128);
            }
        }
    }
    .content-item{
        padding: 20px;
    }
</style>