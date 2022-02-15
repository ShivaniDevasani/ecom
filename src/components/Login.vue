<template>
    <div class="ecom-login">
    <EcomLogo/>
    <form @submit="login">
        <input v-model="username" placeholder="Username" />
        <br />
        <input v-model="password" placeholder="Password" type="password" />
        <br />
        <button class="login-button" type="submit">Sign In</button>
        <div v-if="invalid" class="buttons-container">
            <p >{{message}}</p>
            <button class="login-button guest-button" @click="navigate('/')">Continue as Guest</button>
        </div>
        <div class="signup-container">
            <p>New User? </p>
            <button class="login-button" @click="navigate('/signup')">Sign Up</button>
        </div>
    </form>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import EcomLogo from './EcomLogo.vue';
import axios from 'axios';

export default {
    name:"Login-Component",
    components:{
        EcomLogo
    },
    data: () => {
        return {
            username: "",
            password: "",
            invalid: false,
            message: ""
        };
    },
    methods: {
        ...mapMutations(["setUser", "setToken"]),
        async login(e) {
            e.preventDefault();
            const response = await axios.post("http://localhost:3000/login", 
                {
                    username: this.username,
                    password: this.password
                },
                {
                    "Content-Type": "application/json",
                }
            );
            if(response.status === 200 && response.data.message === 'OK'){
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
        navigate(val){
            this.$router.push(val)
        }
    },
};
</script>
<style lang="scss" scoped>
    .ecom-login{
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
    .login-button{
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
    }
    .signup-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        p{
            margin: 0;
        }
    }
    .buttons-container{
        display: flex;
        width: 100%;
        margin-top: 10px;
        justify-content: space-between;
        align-items: center;
        p{
            margin: 0;
            font-size: 14px;
        }
        .guest-button{
            background-color: #a4c0c4;
            color: black;
            width: auto;
            margin-left: 5px;
        }
    }
</style>