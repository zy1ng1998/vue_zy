
<template>
  <div id="app">
    <div class="nav-box">
      <div class="logo" @click="handleClick">青年教育</div>
      <!-- <router-link to="/home" tag="div" class="logo">青年教育</router-link> -->
      <div class="nav-list">
        <router-link to="/home">首页</router-link>
        <router-link to="/learn">课程学习</router-link>
        <router-link to="/student">学员展示</router-link>
        <router-link to="/about">关于</router-link>
        <router-link to="/activity">社区</router-link>
      </div>
    </div>
    <div class="container">
      <router-view></router-view>
      <router-view name="student"></router-view>

    </div>
  </div>
</template>

<script>
//a标签
// <router-link to='/'>首页</router-link>
//tag属性 自定义标签
// <router-link to='/learn' tag='div'>课程学习</router-link>

export default {
  components: {},
  methods:{
    handleClick(){
      this.$router.push('/home');
      // this.$router.replace('/home');
    }
  },
};
</script>

<style scoped>
.nav-box{
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  background-color: #3385ff;
}

.nav-box .logo{
  color:#fff;
}
.nav-list,.logo,.container{
  margin: 0px 10px 0 20px;

}

.nav-list a{
  color:#fff;
  margin-left: 40px;
  text-decoration: none;
}

.nav-list a.router-link-active{
  font-weight: bold;
}
.container{
  margin-top: 60px;
}


</style>


