<template>
    <div class="review" :class="type">
        <div class="reviewer">
            <TextElement v-if="review.active">{{review.name}}</TextElement>
            <TextElement v-else>Inactive User</TextElement>
            <Rating :rating="review.rating" count=0></Rating>
        </div>
        <div :class="{'review-text':review.image}">
            <TextElement>{{review.text}}</TextElement>
            <img v-if="review.image" :src="review.image" alt="review avatar">
        </div>
        
    </div>
</template>
<script>
import Rating from "./Rating.vue"
import TextElement from "./TextElement.vue"

export default {
    components:{
        Rating,
        TextElement
    },
    props: {
        review: Object
    },
}
</script>
<style lang="scss" scoped>
    .review{
        margin: 20px 0;
        padding: 10px;
        border-bottom: 1px solid #a7a5a5;
    }
    .reviewer{
        display: flex;
        margin-bottom: 10px;
    }
    .review-text{
        display: grid;
        grid-template-columns: 3fr 1fr;
        img{
            width: 70%;
            object-fit: cover;
            margin-left: 20px;
        }
    }
</style>