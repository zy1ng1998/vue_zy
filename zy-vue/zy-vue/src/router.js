import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home';
import auth from './utils/auth.js';

Vue.use(VueRouter);

const routes = [
  {
    path:'/login',
    component:() =>import('./views/Login')
  },

  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    // alias:'/'
  },

  {
    path: '/learn',
    component: () => import('./views/Learn'),
    //   beforeEnter (to ,from ,next) {
    //     next();
    //     console.log('beforeEnter')
    //  }，
  },
  {
    path: '/student',
    // component:() =>import('./views/Student'),
    components: {
      default: () => import('./views/Student'),
      student: () => import('./views/Learn'),
    }
  },
  {
    path: '/about',
    component: () => import('./views/About'),
    meta: {
      backAsk:true,
      requiresLogin: true,
    },
  },
  {
    path: '/activity',
    redirect: '/activity/academic',
    component: () => import( /* webpackChunkName: 'academic' */ './views/Activity'),
    children: [

      {
        path: 'academic',
        name: 'academic',

        component: () => import( /* webpackChunkName: 'academic' */ './views/Academic')
      },
      {
        path: 'personal',
        name: 'personal',
        component: () => import('./views/Personal')
      },
      {
        path: 'download',
        name: 'download',
        component: () => import('./views/Download')
      },
    ],
    meta: {
      requiresLogin: true,
      backAsk:true,
    },
  },
  {
    path: '/couse/:id',
    component: () => import('./views/Learn')
  },
  {
    path: '/question/:id',
    name: 'question',
    props: true,
    component: () => import('./views/Question')
  },

 
];

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(){
    return{
      x:0,
      y:0
    }
  }
});


router.beforeEach((to, from, next) => {
//  console.log(to)
  // console.log(to.meta.requiresLogin);

let isRequiresLogin = to.matched.some( item => item.meta.requiresLogin )
  if (isRequiresLogin) {
    let isLogin = auth.isLogin();
    if(isLogin) {
      next();
    }else{
     let isToLogin = window.confirm("登陆才可以访问，要登陆吗？");
     console.log(isToLogin);
     isToLogin ? next('/login') : next(false);
    }   
    next(false);
  } else {
    next();
  }

  
})

router.beforeResolve((to, from, next) => {
  next();
  // 中
  // console.log('beforeResolve')
})

router.afterEach((to, from) => {
  // 最后执行
  // console.log('afterEach')
})


export default router;