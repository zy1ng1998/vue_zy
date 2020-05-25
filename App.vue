<template>
    <div class="app">
        <DatePicker :date="date" />
        </div>
        
</template>

<script>
import DatePicker from "./DatePicker";

export default {
    components:{
        DatePicker,
    },
    data(){
        return{
            date:new Date(),
        }
    },
}
</script>

<style>

</style>