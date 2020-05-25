<template>
  <div class="date-picker" v-click-outside >
    <div class="picker-input">
      <span class="input-prefix">
        <i class="iconfont icon-date"></i>
      </span>
      <input
       type="text"
        :value="chooseDate"
        />
    </div>
    <div class="picker-panel" v-if="showPanel">
      <div class="picker-arrow" />
      <div class="picker-body">
        <div class="picker-header">
          <span class="picker-btn iconfont icon-prev-year" />
          <span class="picker-btn iconfont icon-prev-month" />
          <span class="picker-date">
            {{ showDate.year }}年{{ showDate.month+1 }}月 
          </span>
          <span class="picker-btn iconfont icon-next-month" />
          <span class="picker-btn iconfont icon-next-year" />
        </div>
        <div class="picker-content">
          <div class="picker-weeks">
            <div v-for="week in ['日', '一', '二', '三', '四', '五', '六']" :key="week">{{ week }}</div>
          </div>
          <div class="picker-days">
            <div 
            v-for="date in showDay" :key="date.getTime()" :class ="{'other-month':!isCur(date).month}
              ">{{ date.getDate() }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  directives:{
    'click-outside':{
     bind(el,binding,vnode){
       const vm = vnode.context;
       document.onclick = function(e){
         const dom = e.target;
         const isElSon = el.contains(dom);

         if(isElSon && !vm.showPanel){
           vm.changeShow(true);
         }else if(!isElSon && vm.showPanel){
           vm.changeShow(false);
         }
        
       }
     }
    },
  },
  props:{
    date:{
      type: Date,
      default:()=> new Date(),
    },
  },
  methods:{
    getYearMonthDay(date){
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
     return {
      year,
      month,
      day,
    }
    },
    changeShow(flag){
      this.showPanel = flag;
    },
    gerShowDate(){
      let{ year, month ,day} = this.getYearMonthDay(this.date);
    this.showDate ={
      year,
      month,
      day,
    }
    },
    isCur(date){
      const{year:showYear, month:showMonth} = this.showDate;
      const{year, month } = this.getYearMonthDay(date);
      return {
        month : year === showYear && month === showMonth,
      }
    },
  },
computed:{
  chooseDate(){
  let{ year, month ,day} = this.getYearMonthDay(this.date);
    return `${year}-${month+1}-${day}`;
  },
  showDay(){
    let{ year ,month } = this.showDate;
    let firstDay = new Date(year,month,1);
    let week = firstDay.getDay();
    let startDay = firstDay - week*24*60*60*1000;
    var arr =[];
    for(let i = 0; i < 42;i++){
      arr.push(new Date(startDay+i*24*60*60*1000));
    }
    console.log(year,month)
    return arr;
  }
},
data(){
  return{
    showPanel:false,
    showDate:{
      year:0,
      month:0,
      day:0,
    }

  }
},
  created(){
    this.gerShowDate();
  },
  
};
</script>


<style scoped>
@import "./assets/font.css";

.date-picker {
  display: inline-block;
}
.picker-input {
  position: relative;
}

.picker-input input {
  height: 40px;
  line-height: 40px;
  padding: 0 30px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  background-color: #fff;
}

.picker-input .input-prefix {
  position: absolute;
  left: 5px;
  width: 25px;
  height: 100%;
  text-align: center;
  line-height: 40px;
  color: #c4c4cc;
}

.picker-panel {
  position: absolute;
  width: 322px;
  height: 329px;
  margin-top: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e4e7ed;
  background-color: #fff;
}

.picker-panel .picker-arrow {
  position: absolute;
  top: -12px;
  left: 30px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #ebeef5;
}

.picker-panel .picker-arrow::after {
  position: absolute;
  left:-6px;
  content: "";
  display: block;
  top:1px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color:#fff;
  border-top-width: 0;
}

.picker-panel .picker-body{

}

.picker-panel .picker-header{
  padding-top:15px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.picker-panel .picker-btn{
  margin-right: 5px;
  margin-right: 5px;
  font-size: 12px;
  color:#303133;
  cursor:pointer;
}


.picker-panel .picker-date{
  margin-left:60px;
  margin-right: 60px;
  font-size: 14px;
  user-select: none;
  
}
.picker-panel .picker-content{
  padding: 0 10px 10px 10px;
  color:#606266;
  user-select: none;
}

.picker-panel .picker-weeks{
  display: flex;
  justify-content:space-around ;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ebeef5;
}


.picker-panel .picker-days{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.picker-panel .picker-days div{
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin:4px 6px;
  font-size: 12px;
  cursor: pointer;
  }
.picker-panel .picker-days div:hover{
  color:#4091ff;
}

.picker-panel .picker-days div.is-today{
  color:#409eff;
  font-weight:700 ;

}

.picker-panel .picker-days div.is-slecet{
  border-radius: 50%;
  background-color: #409eff;
  color: #fff;
}

.picker-panel .picker-days div.other-month{
  color:#c0c4cc;
}

/* .picker-panel */
/* .picker-panel */


/* .picker-panel */
/* .picker-panel */
</style>