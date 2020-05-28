
<template>

<div id="app">
   <base-level :level="2">
   biaoti
   </base-level>
   </div>
 
</template>
<script>

import BaseLevel from './components/BaseLevel.vue';

export default {
  name: 'App',
  data(){
    return {
      
    }
  },
 
  components: {
   
    BaseLevel,
  },
  render(){
  
    
  },


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
