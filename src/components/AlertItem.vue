<template>
    <div class="alert-item">
        <p>{{item.title}}</p>
    </div>
</template>
<script>
export default {
    props: {
        item: Object
    },
}
</script>
<style lang="scss" scoped>
    .alert-item{
        background-color: black;
        margin: 0px 0px 10px 0px;
        color: white;
        padding: 5px;
        border-radius: 10px;
    }
</style>