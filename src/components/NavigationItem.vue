<template>
    <div class="ecom-navitem">
        <div class="ecom-navtitle" @click="navigate(item.slug)" :class="{'nav-border':menuVisible}" v-on:mouseover="displayMenu" v-on:mouseleave="hideMenu">
            <p>{{item.name}}</p>
        </div>
        <div v-if="menuVisible" class="ecom-navmenu" v-on:mouseover.prevent="enterTier" v-on:mouseleave.prevent="leftTier">
            <div v-if="item.sub">
                <div class="ecom-nav-tier" v-for="subItem in item.sub" :key="subItem.name">
                    <div class="ecom-nav-tier1" :class="{'hover-nav-item': menuId === subItem.id}" v-on:mouseover="changeMenuId(subItem.id)">
                        <a :href="`/products/${item.slug}/${subItem.slug}`">{{subItem.name}}</a>
                        <div v-if="menuId === subItem.id" class="header-icon">
                            <img class="large-icon" src="../../public/arrow-solid.png" alt="">
                        </div>
                        <div v-else class="header-icon">
                            <img class="large-icon" src="../../public/arrow-outline.png" alt="">
                        </div>
                    </div>
                    <ul v-if="menuId === subItem.id" class="ecom-nav-tier2">
                        <li class="tier2-item" v-for="subSub in subItem.sub" :key="subSub.name">
                            <a class="tier-title" :href="`/products/${item.slug}/${subItem.slug}/${subSub.slug}`">{{subSub.name}}</a>
                            <div v-for="child in subSub.sub" :key="child.name">
                                <a :href="`/products/${item.slug}/${subItem.slug}/${subSub.slug}/${child.slug}`">{{child.name}}</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else>
                <p>----- No Sub Items for {{item.name}}-----</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NavigationItem',
    props: {
        item: Object
    },
    data() {
        return { 
            menuVisible: false,
            timeout: null,
            menuTimeout:null,
            menuId:1
        }
    },
    methods:{
        displayMenu(){
            clearTimeout(this.menuTimeout)
            this.timeout = setTimeout(() => this.menuVisible = true, 500);
        },
        hideMenu(){
            clearTimeout(this.timeout);
            this.menuId = 1
            setTimeout(() => this.menuVisible = false, 0);
        },
        enterTier(){
            setTimeout(() => this.menuVisible = true, 0);
        },
        leftTier(){
            this.menuId = 1
            this.menuTimeout = setTimeout(() => this.menuVisible = false, 0);
        },
        navigate(link){
            this.$router.push(`/products/${link}`); 
        },
        changeMenuId(id){
            this.menuId = id
        }
    }
}
</script>
<style lang="scss" scoped>
    .ecom-navtitle{
        padding: 10px 20px;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        p{
            margin: 0;
            font-size: 14px;
            pointer-events: none;
        }
        &:hover{
            border-bottom: 2px solid #4f686b;
        }
    }
    .nav-border{
        border-bottom: 2px solid #4f686b;
    }
    .ecom-navmenu{
        position: absolute;
        min-height: 200px;
        width: calc(100% - 40px);
        left: 0;
        padding: 20px;
        background-color: #f5f5dc;
        z-index: 10;
        border-top: 1px solid #4f686b;
    }
    .ecom-nav-tier,.ecom-nav-tier1,.ecom-nav-tier2{
        display: flex;
        align-items: center;
    }
    .ecom-nav-tier1{
        width: 20%;
        margin: 5px;
        padding: 0px 5px;
        cursor: pointer;
        justify-content: space-between;
        a{
            margin: 10px 0px;
            text-decoration: none;
            color: black;
            &:hover{
                text-decoration: underline;
            }
        }
    }
    .hover-nav-item{
        background-color: #c7b77b;
        border-radius: 5px;
    }
    .ecom-nav-tier2{
        position: absolute;
        right: 0;
        top: 0;
        flex-direction: column;
        padding: 10px;
        width: calc(80% - 70px);
        background-color: #f5f5dc;
        display: block;
        a{
            margin: 2px 0px;
            font-size: 13px;
            text-decoration: none;
            color: black;
            &:hover{
                text-decoration: underline;
            }
        }
        .tier-title{
            margin: 5px 0px;
            font-size: 15px;
            font-weight: 700;
        }
        column-count: 2;
        -webkit-column-count: 2;
        -moz-column-count: 2;
    }
    .header-icon{
        display: flex;
        align-items: center;
        cursor: pointer;
        .large-icon{
            width: 15px;
            height: 15px;
            margin: 0px 10px 0px 10px;
        }
    }
    .tier2-item{
        display: block;
        text-align: left;
        padding-left: 100px;
        margin-bottom: 20px;
    }
</style>