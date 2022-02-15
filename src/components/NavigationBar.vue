<template>
    <div class="ecom-navbar">
        <div v-for="item in this.navlist" :key="item.name">
            <NavigationItem :item="item"/>
        </div>
    </div>
</template>
<script>
import NavigationItem from './NavigationItem.vue'
import NavList from '../db/navigationData.json'

export default {
    name: 'NavigationBar',
    data(){
        return{
            navlist: NavList.list,
        }
    },
    components: {
        NavigationItem
    }
}
</script>
<style lang="scss" scoped>
    .ecom-navbar{
        background-color: #a4c0c4;
        display: flex;
        justify-content: center;
    }
</style>