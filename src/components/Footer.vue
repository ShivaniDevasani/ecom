<template>
    <div class="ecom-footer">
        <div class="footer-icon">
            <img class="media-icon" src="../../public/facebook.png" alt="">
        </div>
        <div class="footer-icon">
            <img class="media-icon" src="../../public/instagram.png" alt="">
        </div>
        <div class="footer-icon">
            <img class="media-icon" src="../../public/linkedin.png" alt="">
        </div>
        <div class="footer-icon">
            <img class="media-icon" src="../../public/twitter.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
    name:"Footer-Component"
}
</script>
<style lang="scss" scoped>
    .ecom-footer{
        background-color: #4f686b;
        justify-content: center;
        padding: 10px 0;
        display: flex;
        p{
            color: white;
            margin: 0;
        }
        .footer-icon{
            display: flex;
            align-items: center;
            padding: 0 10px;
            .media-icon{
                width: 40px;
                height: 40px;
            }
        }
        
    }
</style>