import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home';

Vue.use(VueRouter);

const routes =[

  {
    path:'/',
    redirect:'/home'
  },
    {
      path:'/home',
      component:Home,
      // alias:'/'
    },
    {
      path:'/learn',
      component:() =>import('./views/Learn'),
    //   beforeEnter (to ,from ,next) {
    //     next();
    //     console.log('beforeEnter')
    //  }，
    },
    {
      path:'/student',
      // component:() =>import('./views/Student'),
      components:{
        default:() =>import('./views/Student'),
        student:() =>import('./views/Learn'),
      }
    },
    {
      path:'/about',
      component:() =>import('./views/About'),
    },
    {
      path:'/activity',
      redirect:'/activity/academic',
      component:() =>import(/* webpackChunkName: 'academic' */'./views/Activity'),
      children:[
        
        {
          path:'academic',
          name:'academic',
         
          component:() =>import(/* webpackChunkName: 'academic' */'./views/Academic')
        },
        {
          path:'personal',
          name:'personal',
          component:() =>import('./views/Personal')
        },
        {
          path:'download',
          name:'download',
          component:() =>import('./views/Download')
        },
      ]
    },
    {
      path:'/couse/:id',
      component:() =>import('./views/Learn')
    },
    {
      path:'/question/:id',
      name:'question',
      props:true,
      component:()=>import('./views/Question')
    }
    
  ];
  
   const router =  new VueRouter({
    routes,
    mode:'history',
  });


  router.beforeEach((to, from , next)=>{
//  在beforeEach 与 beforeResolve之间
  //  if(to.path === '/about'){
  //    next('/student')
  //  }else{
  //    next()
  //  }
  next();
  // 先
  // console.log('beforeEach')
    
  })

  router.beforeResolve((to, from , next)=>{
    next();
    // 中
    // console.log('beforeResolve')
  })

  router.afterEach((to, from)=>{
    // 最后执行
    // console.log('afterEach')
  })

  
  export default router;

