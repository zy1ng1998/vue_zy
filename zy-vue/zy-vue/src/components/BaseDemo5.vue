<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition
    :duration="1000"
      enter-active-class="animate__animated animate__tada .v-enter-active"
      leave-active-class="animate__animated animate__tada .v-leave-active"
    >
      <div class="box" v-if="show">hello world</div>
    </transition>
  </div>
</template>

<script>

// type="animation"
// 过渡以animation为主，animation结束就结束

// :duration="1000"
//过渡在1s内完成

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

.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-active, .v-leave-active{
  transition: opacity 13s;
}

.v-leave, .v-enter-to {
  opacity: 1;
}



/* 离开时
 开始opacity:1;
transition: opacity 3s;
 结束 opacity: 0;
 */
</style>