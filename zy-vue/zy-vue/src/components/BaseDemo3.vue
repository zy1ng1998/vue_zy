<template>
  <div class="demo">
      <button @click="handleClick">切换</button>
    <transition  mode="in-out">
   <div class="box" :key="keyName">
       {{ keyName }}
   </div>
    </transition>
  </div>
</template>

<script>

//都是div会就地复用 所以要设置key

// 上面是使用key
export default {
    data(){
        return{
            keyName:"dog",
        }
    },
    methods:{
        handleClick(){
            let isDog = this.keyName === "dog";
            this.keyName = isDog ? "cat" : "dog";
        }
    },

}
</script>

<style scoped>

button{
    display: block;
}

.box{
  position: absolute;
  display: inline-block;
  width: 150px;
  height: 30px;
  margin-top: 10px;
  line-height: 30px;
  text-align: center;
  background-color: gray;
  color: #fff;
}
.v-enter{
    opacity: 0;
    transform: translateX(80px);
}

.v-enter-active,
.v-leave-active{
    transition:all .3s;
}

.v-enter-to,
.v-leave{
    opacity:1;
    transform: translateX(0px);

}
.v-leave-to{
    opacity:0;
    transform: translateX(-80px);
}
</style>