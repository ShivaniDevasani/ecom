<template>
    <div class="tag" :class="type">
        <div class="icon"></div>
        <p>{{text}}</p>
    </div>
</template>
<script>
export default {
    props: {
        text: String,
        type: String
    },
}
</script>
<style lang="scss" scoped>
    .tag{
        display: flex;
        background-color: #f5f5dc;
        padding: 5px 7px;
        border-radius: 15px;
        margin: 5px 10px 5px 0;
        p{
            margin: 0;
            font-size: 12px;
            
        }
        .icon{
            height: 15px;
            width: 15px;
            background-repeat: no-repeat;
            background-size: cover;
            margin-right: 5px;
        }
    }
    .shipping{
        .icon{
            background-image: url("../../public/shipping.png");
        }
    }
    .ordersoon{
        .icon{
            background-image: url("../../public/ordersoon.png");
        }
    }
    .handcrafted{
        .icon{
            background-image: url("../../public/handcrafted.png");
        }
    }
    .organic{
        .icon{
            background-image: url("../../public/organic.png");
        }
    }
    .sustainable{
        .icon{
            background-image: url("../../public/sustainable.png");
        }
    }
    .certified{
        .icon{
            background-image: url("../../public/certified.png");
        }
    }
</style>