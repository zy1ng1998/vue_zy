<template>
  <div class="question" v-if="question">
    <div class="main">问题：{{ question.title }}</div>
    <div class="other">
      <div
        v-for="other in otherQuestionList"
        :key="other.id"
        :class="other.type"
        :title="other.title"
        @click="handleClick(other.id)"
      >{{ other.title }}</div>
      <!-- <div class="prev" :title="question.prev"> wfw{{ question.prev }} </div>
      <div class="next" :title="question.next"> {{ question.next }} </div>-->
    </div>
  </div>
</template>

<script>
export default {
  beforeRouteUpdate(to ,from , next){
    next();
    // console.log('update')
  },

  // beforeRouteLeave(to, from, next){
  //   let isGo = window.confirm("真的要走吗");
  //   isGo ? next() : next(false);
  // },
  
  props:{
    id:{
      type:[ String, Number ],
    }
  },
  data() {
    return {
      question: ""
    };
  },
  mounted() {
      // this.getData();
  },
  computed: {
    otherQuestionList() {
      const arr = [];
      if (this.question.prev) {
        const { prev, prevId } = this.question;
        arr.push({
          type: "prev",
          title: prev,
          id: prevId
        });
      }

      if (this.question.next) {
        const { next, nextId } = this.question;
        arr.push({
          type: "next",
          title: next,
          id: nextId
        });
      }
      return arr;
    }
  },
  methods: {
    handleClick(id) {
      this.$router.push({
        name: "question",
        params: {
          id
        }
      });
    },
    getData() {
      // const { id } = this.$route.params;
      const id = this.id;
      this.$axios.get(`/question/${id}`).then(res => {
      this.question = res;
      });
    }
  },
  watch: {
    $route: {
      handler() {
        this.getData();
      },
      immediate:true,
    }
  }
};
</script>


<style scoped>
.main {
  margin-bottom: 200px;
}

.prev {
  float: left;
}

.next {
  float: right;
}

.prev,
.next {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #3385ff;
  cursor: pointer;
  text-decoration: underline;
}
</style>