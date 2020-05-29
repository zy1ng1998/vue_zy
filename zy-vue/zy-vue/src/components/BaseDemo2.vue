<template>
  <div id="app">
      <button @click="handleClick">切换</button>
    <transition>
   <div :key="keyName">
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

.v-enter,
.v-leave-to{
    opacity: 0;
}

.v-enter-active,
.v-leave-active{
    transition:all .3s;
}

.v-enter-to,
.v-leave{
    opacity:1;
}
</style>