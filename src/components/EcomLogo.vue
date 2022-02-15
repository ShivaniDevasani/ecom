<template>
    <div class="ecom-logo" @click="navigateHome">
        <img src="../../public/letter-e.png" alt="logo">
        <img src="../../public/com.png" alt="logo">
    </div>
</template>
<script>
export default {
    name: 'EcomLogo',
    methods:{
        navigateHome(){
            if (this.$route.path !== '/')
                this.$router.push("/");
        }
    }
}
</script>
<style lang="scss" scoped>
    .ecom-logo{
        display: flex;
        cursor: pointer;
        img{
            width: 40px;
            height: 40px;
        }
    }
</style>