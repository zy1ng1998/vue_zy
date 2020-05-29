<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition
    appear
      enter-active-class="animate__animated animate__bounceInRight"
      leave-active-class="animate__animated animate__bounceOutDown"
    >
      <div class="box" v-if="show">hello world</div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
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

.v-enter {
  opacity: 0;
}
.v-enter-active {
  transition: opacity 3s;
}
.v-enter-to {
  opacity: 1;
}
.v-leave {
  opacity: 1;
}
.v-leave-active {
  transition: opacity 0.3s;
}
.v-leave-to {
  opacity: 0;
}

/* 离开时
 开始opacity:1;
transition: opacity 3s;
 结束 opacity: 0;
 */
</style>