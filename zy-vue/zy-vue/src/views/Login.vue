<template>
    <div class="login">
        <button @click="handleClick">
            {{ btnText }}
        </button>
    </div>
</template>

<script>
import auth from '../utils/auth.js'
export default {
    data(){
        return{
            isLogin:auth.isLogin()
        }
    },
    methods:{
        handleClick(){
            if(this.isLogin){
                //取消登录
                auth.cancelLogin();
            }else{
                  auth.login();
                  this.goBack();
            }
        this.isLogin = !this.isLogin;
        },
        goBack(){
            let isGoBack = window.confirm("登录成功，返回吗？");
            if(isGoBack){
                this.$router.go(-1);
            }


        },

    },
    computed:{
        btnText(){
            return this.isLogin ? "取消登录" : "登录";
        }
    }
}
</script>