import {mapActions} from 'vuex'

export default {
    data(){
        return{
            categoryList:[]
        }
    },
    methods:{
        ...mapActions(["getCategoryPageDetails"]),
    },
    created(){
        const params = this.$route.params
        this.getCategoryPageDetails(params).then((res)=>{
            this.categoryList = res
        })
    }
}