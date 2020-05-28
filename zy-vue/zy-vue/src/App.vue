

<script>
// <template>
//   <div id="app">
//     <img alt="Vue logo" src="./assets/logo.png">
//     <HelloWorld msg="Welcome to Your Vue.js App"/>
//   </div>
// </template>


// <template>
//   <div>
//     <base-demo>
//    <template #default>
//      <div>默认</div>
//    </template>
//    <template #header>
//      <div>header</div>
//    </template>
//     </base-demo>
//   </div>
// </template>

// <template>
//    <base-demo v-slot ="{text}"
//    >
//    {{ text }}
//    </base-demo>
// </template>

// import HelloWorld from './components/HelloWorld.vue'
import BaseDemo from './components/BaseDemo.vue';

export default {
  name: 'App',
  data(){
    return {
      name:'zy',
      show:false,
      value:"打工",
      msg:"内容",
    }
  },
  methods:{
    handleClick(num){
      console.log(num);
    }

  },
  components: {
    // HelloWorld
    BaseDemo,
  },
  render(){
    return (
     <div>{ this.name }
     <div v-show={this.show}>学习</div>
    { !true ? <div>div</div> : <span>span</span>}
    <ul>
       { [1, 2 ,3 ].map(item => <li key={item} ref="li" refInFor={true}>{item}</li> )}
    </ul>

    <button on-click={()=>{ this.handleClick(1)}}> 点击</button>
    <input value = {this.value}/>
    <div class ="demo active" style ={{color:'red',fontSize:'50px'}}>红色</div>
    <input v-model={this.msg} /> 
    {this.msg}

   
   <base-demo 
   {...{scopedSlots:{default:(props)=> props.text}}}
   >

    </base-demo>

     </div>
    )
    
  },
  mounted(){
    console.log(this.$refs)
  }
}

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
