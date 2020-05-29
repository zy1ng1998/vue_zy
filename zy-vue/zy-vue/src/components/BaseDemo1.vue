<template>
  <div id="app">
      <button @click="show = !show">切换</button>
    <transition>
      <div v-if = "show" key="syh">syh</div>
      <div v-else key="zy">zy</div>
    </transition>
  </div>
</template>

<script>

//都是div会就地复用 所以要设置key
export default {
    data(){
        return{
            show:true,
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