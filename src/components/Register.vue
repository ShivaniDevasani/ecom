<template>
  <div class="ecom-register">
    <EcomLogo/>
    <form @submit="register">
        <div v-if="errors" class="errors-list">
            <p v-for="(error,prop) in errors" :key="prop">{{error}}</p>
        </div>
        <input v-model="username" placeholder="Username"/>
        <br />
        <input v-model="password" placeholder="Password" type="password"/>
        <br />
        <input v-model="confirmPassword" placeholder="Confirm Password" type="password"/>
        <br />
        <button :disabled="disable" class="register-button" type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import EcomLogo from './EcomLogo.vue';
import axios from 'axios';

export default {
    name:"Register-Component",
    components:{
        EcomLogo
    },
    data: () => {
        return {
            username: "",
            password: "",
            confirmPassword: "",
            errors:{
                password:"",
                confirmPassword:""
            },
            message:"",
            invalid:false
        };
    },
    methods: {
        ...mapMutations(["setUser", "setToken"]),
        async register(e) {
            e.preventDefault();
            const response = await axios.post("http://localhost:3000/register",
                {
                    username: this.username,
                    password: this.password
                },
                {
                    "Content-Type": "application/json",
                }
            );
            if(response.status === 200){
                const { user, token } = response.data;
                this.setUser(user);
                this.setToken(token);
                this.$router.push("/");
            }
            else{
                const { message } = response.data;
                this.message = message
                this.invalid = true
            }
        },
    },
    watch:{
        password(newval){
            if(newval.length <8){
                this.errors.password = "Password should be atleast 8 characters"
            }
            else{
                this.errors.password = ""
            }
            if((newval !== this.confirmPassword) && this.confirmPassword){
                this.errors.confirmPassword = "Passwords not matching"
            }
            else{
                this.errors.confirmPassword = ""
            }
        },
        confirmPassword(newval){
            if(newval !== this.password){
                this.errors.confirmPassword = "Passwords not matching"
            }
            else{
                this.errors.confirmPassword = ""
            }
        }
    },
    computed:{
        disable(){
            if(this.username && this.password && this.confirmPassword && this.errors.password.length === 0 && this.errors.confirmPassword.length === 0 ){
                return false
            }
            return true
        }
    }
};
</script>
<style lang="scss" scoped>
    .ecom-register{
        margin: 100px 500px;
        padding: 50px;
        border: 1px solid black;
        border-radius: 8px;
        .ecom-logo{
            justify-content: center;
        }
        form{
            margin-top: 50px;
        }
        input{
            width: 100%;
            margin-bottom: 10px;
            padding: 5px 8px;
            border: 0;
            box-sizing:border-box;
            border-bottom: 1px solid #4f686b;
            border-radius: 2px;
            &:focus{
                outline: none;
                box-shadow: 0px 8px 10px -8px  grey;
            }
        }
    }
    .register-button{
        background-color: #4f686b;
        color: white;
        padding: 5px 20px;
        border-radius: 5px;
        border-style: none;
        width: 100%;
        cursor: pointer;
        &:hover{
            -moz-box-shadow: 0px 0px 4px 1px grey;
            -webkit-box-shadow: 0px 0px 4px 1px grey;
            box-shadow: 0px 0px 4px 1px  grey;
        }
        &:disabled{
            background-color: #a4c0c4;
            box-shadow: none;
            cursor: not-allowed;
        }
    }
    .errors-list{
        color: red;
        text-align: left;
        margin-bottom: 20px;
        p{
            margin: 5px 0;
            font-size: 12px;
        }
    }
</style>