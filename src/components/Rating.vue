<template>
    <div class="rating">
        <img v-for="index in rating" :key="index" class="rating-image" src="../../public/star-solid.png" alt="star image">
        <div class="empty-rating" v-if="rating < 5">
            <img v-for="index in (5 - rating)" :key="index" class="rating-image" src="../../public/star-outline.png" alt="star image">
        </div>
        <p v-if="count >0">({{count}})</p>
    </div>
</template>
<script>
export default {
    props: {
        rating: Number,
        count: Number
    },
}
</script>
<style lang="scss" scoped>
    .rating{
        display: flex;
        padding: 2px 4px;
        align-items: center;
        img{
            width: 13px;
            height: 13px;
            margin-right: 2px;
        }
        P{
            margin: 0 5px;
            font-size: 12px;
        }
    }
    .empty-rating{
        display: flex;
        align-items: center;
    }
</style>