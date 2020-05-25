<template>
    <div class="tree">


        <li
        v-for="(node,index) in data"
        :key="node[defaultProps.label]"
         class="tree-node"
         >
            <i 
            v-if="node[defaultProps.children]"
            class = "iconfont "
            :class="{
                'icon-down':!showChildren[index],
                'icon-right':showChildren[index]
                }"
            ></i>
            <span 
            class ="node-label"
            @click ="handleClick(index)"
            >

                {{ node[defaultProps.label] }}
            </span>

            <keep-alive>
                <base-tree 
            v-if="showChildren[index] && node[defaultProps.children]"
             :data="node[defaultProps.children]"
             /> 
            </keep-alive>
           
            </li>
       

    </div>
</template>

<script>
export default {
    name:'base-tree',

    props:{
        data:{
            type:Array,
            required:true,
        },
        defaultProps:{
            type:Object,
            default:()=>({
                label:"label",
                children:"children",
            })
            
        }
    },
    created(){
       
    },
    methods:{
        handleClick(index){
            const flag = !this.showChildren[index]
            this.$set(this.showChildren,index,flag)
        }
    },
    data(){
        return{
            showChildren:[],
        }
    }
}
</script>

<style scoped>
@import "./assets/font.css";
li {
  list-style: none;
}
.tree-node {
  cursor: pointer;
}
.tree-node .iconfont {
  color: #c0c4cc;
  font-size: 12px;
  margin-right: 5px;
  vertical-align: middle;
}
.tree-node .node-label {
  font-size: 14px;
  color: #606266;
  vertical-align: middle;
}
</style>