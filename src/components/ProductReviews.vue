<template>
    <div>
        <Review v-for="review in reviews" :key="review.text" :review="review"></Review>
    </div>
</template>
<script>
import Review from "./Review.vue"

export default {
    props:{
        reviews: Array
    },
    components:{
        Review
    }
}
</script>