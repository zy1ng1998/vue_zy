[toc]

# vue的响应式1
- 什么是响应式
>数据变化页面就会重新渲染

  >注意：只有已经定义过的和已经渲染过的数据变化才会响应式

- 没有定义过的
```js
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
```js
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

## vm.$el
- 值被vue控制的元素
- 相当于
```js
var odiv = document.getElementsByClassName(".demo")

//等于
vm.$el

```

- 更改数据后，页面会立刻重新渲染吗
  >不会，vue更新DOM的操作是异步执行的，只要侦听到数据变化，将开启一个异步队列，如果一个数据被多次变更，那么只会被推入到队列中一次，这样可以避免不必要的计算和DOM操作。


```js
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
## vm.$nextTick或Vue.nextTick
- 如何在数据更改后，看到页面渲染后的值
  >利用vm.$nextTick或Vue.nextTick,DOM更改后会立刻执行这两个函数
  ```js
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
  ```js
  
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
  ```js
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
# vue的响应式2
- 除了未被声明过和未被渲染的数据外，还有什么数据更改后不会渲染页面？
  >
1. 利用索引直接设置一个数组项时：
``` js
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
    vm.msg[3] = "奶茶"
    //控制台 [ "火锅", "烧烤", "炸串" ]
    //通过索引修改数组不能发生重新渲染 

``` 
>
2. 修改数组的长度时
```js
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
```js
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

```js
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


```js
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

# vue相关指令

- 具有特殊含义、拥有特殊功能的特性
- 指令带有v-前缀，表示它们是Vue提供的特殊特性
- 指令可以直接使用data中的数据
  
## v-pre
- 跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

```js
 <div class="demo" v-pre>
        {{ msg }}
    </div>
     
    // 控制台    {{ msg }}
```
## v-clock
- 这个指令保持在元素上直到关联实例结束编译
- 可以解决闪烁的问题
- 和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕
```js    
<style>
        [v-cloack]{
            display: none;
        }
</style>

```
```js
  <div class="demo" v-cloak>
        {{ msg }}
    </div>

    <script>
        new Vue({
            el: ".demo",
            data: {
                msg: "rain"
            }
        })
    </script>
 ```
## v-once
-  只渲染元素一次。随后的重新渲染，元素及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能
```js
    <div class="demo" v-once>
        {{ msg }}
    </div>

    <script>
        let vm = new Vue({
            el: ".demo",
            data: {
                msg: "rain"
            }
        })
    </script>
```
## v-text
-  更新元素的textContent
```js
    <span class="demo" v-text='msg'>

    </span>

    <script>
        let vm = new Vue({
            el: ".demo",
            data: {
                msg: "rain"
            }
        })
    </script>
```
等同于
```js
  <span class="demo">
        {{ msg }}
    </span>

    <script>
        let vm = new Vue({
            el: ".demo",
            data: {
                msg: "rain"
            }
        })
    </script>
```
- 区别：v-text替换元素中所有的文本，Mustache只替换自己，不清空元素内容
```js
    <!--   渲染为 ---rain---   -->
    <span class="demo">
        ---{{msg}}---
    </span>

    <!-- 渲染为rain -->
    <span class="demo" v-text="msg">
        --- ---
    </span>
```
- v-text优先级高于Mustache {{}}

> textContent VS innerText
1. 设置文本替换时，两者都会把指定节点下的所有子节点也一并替换掉。
2. textContent 会获取所有元素的内容，包括 ```<script>``` 和 ```<style> ```元素，然而 innerText 不会。
3. innerText 受 CSS 样式的影响，并且不会返回隐藏元素的文本，而textContent会。
4. 由于 innerText 受 CSS 样式的影响，它会触发重排（reflow），但textContent 不会。
5. innerText 不是标准制定出来的 api，而是IE引入的，所以对IE支持更友好。textContent虽然作为标准方法但是只支持IE8+以上的浏览器，在最新的浏览器中，两个都可以使用。
6. 综上，Vue这里使用textContent是从性能的角度考虑的。

## v-html
- 更新元素的innerHTML
- ***注意***：内容按普通 HTML 插入，不会作为 Vue 模板进行编译 
- 在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。只在可信内容上使用 v-html，永远不要在用户提交的内容上。

> 输入<span>123</123>会显示123，并在dom中插入<span>123</123>

```js
<input type="text">
    <button>点击</button>
    <div class="demo" v-html="msg"></div>
    <script>
        let vm = new Vue({
            el: ".demo",
            data: {
                msg: ""
            }
        })
        let oinp = document.getElementsByTagName("input")[0];
        let btn = document.getElementsByTagName("button")[0];

        btn.onclick = function () {
            vm.msg = oinp.value
        }
    </script>
```


