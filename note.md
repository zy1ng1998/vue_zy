[toc]

### vue的响应式1
- 什么是响应式
>数据变化页面就会重新渲染

  >注意：只有已经定义过的和已经渲染过的数据变化才会响应式

- 没有定义过的
```
<!-- zy.name在data中没有定义 -->
    <div class="demo">
    {{ zy.wife }}
    {{ zy.name }}
    </div>

    <script>
        let vm = new Vue({
            el:'.demo',
            data:{
              zy:{
                  wife:"cute",
                  age:18
              }
            }
        })
    </script>
```

此时在控制台我们令
vm.zy.name ="小张"
并不会发生响应式



 - 没有渲染过的
```
<!-- zy.age没有渲染过-->
    <div class="demo">
    {{ zy.wife }}
 
    </div>

    <script>
        let vm = new Vue({
            el:'.demo',
            data:{
              zy:{
                  wife:"cute",
                  age:18
              }
            }
        })
    </script>
```
此时在控制台我们令
vm.zy.age =19
并不会发生响应式

### vm.$el
- 值被vue控制的元素
- 相当于
```
var odiv = document.getElementsByClassName(".deme")

//等于
vm.$el

```

- 更改数据后，页面会立刻重新渲染吗
  >不会，vue更新DOM的操作是异步执行的，只要侦听到数据变化，将开启一个异步队列，如果一个数据被多次变更，那么只会被推入到队列中一次，这样可以避免不必要的计算和DOM操作。


```
  <div class="demo">
    {{ zy.wife }}
 
    </div>

    <script>
        let vm = new Vue({
            el:'.demo',
            data:{
              zy:{
                  wife:"cute",
                  age:18
              }
            }
        })
        vm.zy.wife = "no"
        console.log(vm.zy.wife,vm.$el.innerHTML)// no  cute 页面还未渲染
    </script>
```
### vm.$nextTick或Vue.nextTick
- 如何在数据更改后，看到页面渲染后的值
  >利用vm.$nextTick或Vue.nextTick,DOM更改后会立刻执行这两个函数
  ```
     <div class="demo">
    {{ msg }}
 
    </div>

    <script>
        let vm = new Vue({
            el:'.demo',
            data:{
           msg:"小张"
            }
        })

        vm.msg = "小张可爱"
        vm.$nextTick(()=>{
            console.log(vm.$el.innerHTML)
            //小张可爱  说明已经渲染了
        })
      
    </script>
  
  
  ```
  - vm.$nextTick或Vue.nextTick 还可以当作Promise用
  ```
  
     <div class="demo">
    {{ msg }}
 
    </div>

    <script>
        let vm = new Vue({
            el:'.demo',
            data:{
           msg:"小张"
            }
        })

        vm.msg = "小张可爱"
        vm.$nextTick().then(()=>{
            console.log(vm.$el.innerHTML)
            //小张可爱  说明已经渲染了
        })
      
    </script>
  
  
  ```
  - vm.$nextTick或Vue.nextTick的不同之处
  >Vue.nextTick的this指向window
  >vm.$nextTick的this指向vm实例

  注意测试this指向时不要用es6箭头函数

  - nextTick是怎样实现的
  - 在nextTick的源码中，会先判断是否支持微任务，不支持后才执行宏任务
  ```
    if(typeof Promise !== 'undefined') {
    // 微任务
    // 首先看一下浏览器中有没有promise
    // 因为IE浏览器中不能执行Promise
    const p = Promise.resolve();

  } else if(typeof MutationObserver !== 'undefined') {
    // 微任务
    // 突变观察
    // 监听文档中文字的变化，如果文字有变化，就会执行回调
    // vue的具体做法是：创建一个假节点，然后让这个假节点稍微改动一下，就会执行对应的函数
  } else if(typeof setImmediate !== 'undefined') {
    // 宏任务
    // 只在IE下有
  } else {
    // 宏任务
    // 如果上面都不能执行，那么则会调用setTimeout
  }
  ```
### vue的响应式2
- 除了未被声明过和未被渲染的数据外，还有什么数据更改后不会渲染页面？
  >
1. 利用索引直接设置一个数组项时：
```   <div class="demo">
    {{ msg }}
 
    </div>

    <script>
        let vm = new Vue({
            el:'.demo',
            data:{
           msg:["火锅","烧烤","炸串"]
            }
        })
    vm.msg[3] = "奶茶"
    //控制台 [ "火锅", "烧烤", "炸串" ]
    //通过索引修改数组不能发生重新渲染 

``` 
>
2. 修改数组的长度时
```
 <div class="demo">
    {{ msg }}
 
    </div>

    <script>
        let vm = new Vue({
            el:'.demo',
            data:{
           msg:["火锅","烧烤","炸串"]
            }
        })
    vm.msg.length = 1
    //控制台 [ "火锅", "烧烤", "炸串" ]
    //通过改变数组长度 不能发生重新渲染 
      
    </script>

```
>
3. 增加或删除对象属性
```
  <div class="demo">
        {{ wallet }}

    </div>

    <script>
        let vm = new Vue({
            el: '.demo',
            data: {
                wallet: {
                    card1: "acbc",
                    card2: "alipay"
                }
            }
        })
        vm.wallet.card3 = "wechat"
        //控制台 { "card1": "acbc", "card2": "alipay" }
        //说明不是响应式的

        delete vm.wallet.card1


        //控制台 { "card1": "acbc", "card2": "alipay" }
        //说明不是响应式的
    </script>
```

- 怎样实现数组和对象的响应式
>
更改数组：
1. 利用数组变异方法：push、pop、shift、unshift、splice、sort、reverse
2. 利用vm.$set/Vue.set实例方法
3. 利用vm.$set或Vue.set删除数组中的某一项

vm.$set是Vue.set的别名
使用方法：Vue.set(object, propertyName, value)，也就是这个意思：Vue.set(要改谁，改它的什么，改成啥)

vm.$delete是Vue.delete的别名
使用方法：Vue.delete(object, target)，也就是这个意思：Vue.delete(要删除谁的值，删除哪个)

```
   <div class="demo">
        {{ wallet }}

    </div>

    <script>
        let vm = new Vue({
            el: '.demo',
            data: {
                wallet: {
                    card1: "acbc",
                    card2: "alipay"
                }
            }
        })
        vm.$set(vm.wallet, "card3", "wechat")
        Vue.set(vm.wallet, "card4", "招商")
        //{ "card1": "acbc", "card2": "alipay", "card3": "wechat", "card4": "招商" }
        //是响应式的
    </script>

```


```
    <div class="demo">
        {{ msg }}

    </div>

    <script>
        let vm = new Vue({
            el: '.demo',
            data: {
              msg:["火锅","烧烤","炸串"]
            }
        })
    vm.msg.push("奶茶")
    //[ "火锅", "烧烤", "炸串", "奶茶" ]
    //是响应式的
    </script>
```


