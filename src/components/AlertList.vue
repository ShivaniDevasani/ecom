<template>
    <div v-if="alertList.length" class="alert-list">
        <div >
            <AlertItem v-for="item in alertList" :key="item.title" :item="item"></AlertItem>
        </div>
    </div>
</template>
<script>
import AlertItem from './AlertItem.vue'
import { EventBus } from '../event-bus';

export default {
    components:{
        AlertItem
    },
    data(){
        return{
            count: 0,
            displayAlertList: true,
            alertList: []
        }
    },
    mounted(){
        EventBus.$on('added-to-wishlist', this.addAlertItem);
    },
    methods:{
        addAlertItem(name,val){
            this.alertList.push({
                title: `${val?'Added':'Removed'} ${name.slice(0,30)}... ${val?'to':'from'} Wishlist`
            })
            setTimeout(()=>{
                this.alertList.shift()
            },2000)
        }
    },
}

</script>
<style lang="scss" scoped>
    .alert-list{
        position: fixed;
        top: 0;
        right: 0;
        padding: 120px 20px 20px 20px;
        width: 400px;
    }
</style>