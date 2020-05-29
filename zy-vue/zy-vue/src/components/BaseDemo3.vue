<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition>
      <div class="box" v-if="show">hello world</div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  }
};
</script>

<style scoped>
button {
  margin-bottom: 10px;
}

.box {
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid red;
  color: red;

}

.v-enter-active{
    animation: slither 1s;
}

@keyframes slither{
    0% {
        opacity: 0;
        transform: translateX(300px) scale(1);
    }
    50%{ 
        opacity: 0.5;
        transform: translateX(150px) scale(1.5);
    }
    100%{
        opacity: 1;
        transform: translateX(0px) scale(1);
    }
}

/* 离开时
 开始opacity:1;
transition: opacity 3s;
 结束 opacity: 0;
 */
</style>