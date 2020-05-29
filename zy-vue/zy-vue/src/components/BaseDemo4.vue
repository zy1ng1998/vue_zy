<template>
  <div class="demo">
      <button @click="handleClick">切换</button>
    <transition  mode="in-out">
        <component :is="cmpName"></component>
    </transition>
  </div>
</template>

<script>
import Demo1 from "./BaseDemo4-1.vue";
import Demo2 from "./BaseDemo4-2.vue";

export default {
    components:{
        Demo1,
        Demo2,
    },
    data(){
        return{
            cmpName:'demo1',
            
        }
    },
      methods:{
        handleClick(){
            let isDemo1 = this.cmpName === "demo1";
            this.cmpName = isDemo1 ? "demo2" : "demo1";
        }
    },
}


</script>

// 动态组件过渡

<style scoped>
button{
    display: block;
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