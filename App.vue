<template>
    <div>
        姓名{{ name }}
        <p>父元素P</p>
        <base-son />
    </div>
</template>

<script>
import baseSon from "./Son"
export default {
    components:{
        baseSon
    },
    data(){
        return{
            name:'zy'
        }
    }
}
</script>

<style>
div{
    background-color: blueviolet;
}
</style>