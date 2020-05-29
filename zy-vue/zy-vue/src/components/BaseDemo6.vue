<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition 
    :durantion="4000"
    name="box" >
      <div class="box" v-show="show">
          <transition name="span"> 
               <span v-if="show">hello world</span>
            </transition>
          </div>
    </transition>
  </div>
</template>

<script>

// type="animation"
// 过渡以animation为主，animation结束就结束

// :duration="1000"
//过渡在1s内完成

//注意
//当子元素里有过渡时，父元素用v-if,子元素过渡不会生效，应该使用v-show使得其一直存在



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

.box-enter,
.box-leave-to {
  transform: translateX(300px);
}
.box-enter-active, .box-leave-active{
  transition: all 2s;
}

.box-leave, .box-enter-to {
  transform: translateX(0px);
}

.span-enter,
.span-leave-to {
font-size: 12px;
}
.span-enter-active, .span-leave-active{
  transition: all 2s 2s;
}

.span-leave, .span-enter-to {
  font-size: 20px;
}

/* 离开时
 开始opacity:1;
transition: opacity 3s;
 结束 opacity: 0;
 */
</style>