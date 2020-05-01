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

# 条件渲染

## v-if
- 用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truthy 值的时候被渲染。

```js
// 此时不会渲染 下雨了
  <div class="demo">
        <div v-if="show">下雨了</div>
    </div>
    <script>
        let vm = new Vue({
            el: ".demo",
            data: {
                show: "",
            }

        })
    </script>
```
## v-else-if
- v-if 的elseif块
```js
    <!-- 渲染晴天 -->
    <div class="demo">
        <div v-if= "type ==='B'">下雨了</div>
        <div v-else-if ="type === 'A'" >晴天</div>
    </div>
    <script>
   let vm = new Vue({
       el:".demo",
       data:{
           type:"A"
       }
   })
```
## v-else
- 为 v-if 或者 v-else-if 添加“else 块”。
- ***注意***：前一兄弟元素必须有 v-if 或 v-else-if

```js
    <!-- 渲染阴天 -->
    <div class="demo">
        <div v-if= "type ==='B'">下雨了</div>
        <div v-else-if ="type === 'C'" >晴天</div>
        <div v-else>阴天</div>
    </div>
    <script>
   let vm = new Vue({
       el:".demo",
       data:{
           type:"A"
       }
   })
    </script>
```
## v-show
- 根据表达式之真假值，切换元素的 display CSS 属性。
  ```html
  <h1 v-show="ok">Hello!</h1>
  ```

## v-if VS v-show
1. v-if 是惰性的，如果在初始渲染时条件为假，则什么也不做，直到条件第一次变为真时，才会开始渲染条件块。v-show则不管初始条件是什么，元素总是会被渲染（dispaly:none），并且只是简单地基于 CSS 进行切换。
2. v-if 有更高的切换开销，v-show 有更高的初始渲染开销，如果需要非常频繁地切换，则使用 v-show 较好，如果在运行时条件很少改变，则使用 v-if 较好
3. v-show不支持```<template>```元素
4. v-show不支持v-else/v-else-if

# v-bind指令
- 动态地绑定一个或多个特性
- :后为传递地参数
  ```html
  <!-- 绑定一个属性 -->
  <img v-bind:src="imageSrc">

  <!-- 动态特性名 (2.6.0+) -->
  <button v-bind:[key]="value"></button>

  <!-- 缩写 -->
  <img :src="imageSrc">

  <!-- 动态特性名缩写 (2.6.0+) -->
  <button :[key]="value"></button>

  <!-- 内联字符串拼接 -->
  <img :src="'/path/to/images/' + fileName">
  ```
- 没有参数时，可以绑定到一个包含键值对的对象。注意此时 class 和 style 绑定不支持数组和对象。
  ```html
  <!-- 绑定一个有属性的对象 -->
  <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
  ```
- 由于字符串拼接麻烦且易错，所以在绑定 class 或 style 特性时，Vue做了增强，表达式的类型除了字符串之外，还可以是数组或对象。

  - 绑定class
    - 对象语法
      ```html
      <div v-bind:class="{ red: isRed }"></div>
      ```
      上面的语法表示 active 这个 class 存在与否将取决于数据属性 isActive 的 真假。

    - 数组语法
      我们可以把一个数组传给 v-bind:class，以应用一个 class 列表
      ```html
      <div v-bind:class="[classA, classB]"></div>
      ```
    - 在数组语法总可以使用三元表达式来切换class
      ```html
      <div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
      ```
    - 在数组语法中可以使用对象语法
      ```html
        <div v-bind:class="[classA, { classB: isB, classC: isC }]">
        <div v-bind:class="classA" class="red">
      ```
    - v-bind:class 可以与普通 class 共存
      ```html
        <div v-bind:class="classA" class="red">
      ```

      - 绑定style
    - 使用对象语法
      看着比较像CSS，但其实是一个JavaScript对象
      CSS属性名可以用驼峰式(camelCase)或者短横线分隔(kebab-case)来命名
      但是使用短横线分隔时，要用引号括起来
      ```html
      <div v-bind:style="{ fontSize: size + 'px' }"></div>
      ```
      ```js
      data: {
        size: 30
      }
      ```
      也可以直接绑定一个样式对象，这样模板会更清晰：
      ```html
      <div v-bind:style="styleObject"></div>
      ```
      ```js
      data: {
        styleObject: {
          fontSize: '13px'
        }
      }
      ```

  - 使用数组语法
      数组语法可以将多个样式对象应用到同一个元素
      ```html
      <div v-bind:style="[styleObjectA, styleObjectB]"></div>
      ```
    - 自动添加前缀
      绑定style时，使用需要添加浏览器引擎前缀的CSS属性时，如 transform，Vue.js会自动侦测并添加相应的前缀。
    - 多重值
      从 2.3.0 起你可以为 style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值:
      ```html
      <div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
      ```
      这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。

      - 缩写: ```:```
- 修饰符：
  修饰符 (modifier) 是以英文句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。
  - .camel
    由于绑定特性时，会将大写字母转换为小写字母，如：
    ```html
    <!-- 最终渲染的结果为：<svg viewbox="0 0 100 100"></svg> -->
    <svg :viewBox="viewBox"></svg>
    ```
    所以，Vue提供了v-bind修饰符 camel，该修饰符允许在使用 DOM 模板时将 v-bind 属性名称驼峰化，例如 SVG 的 viewBox 属性
    ```html
    <svg :view-box.camel="viewBox"></svg>
    ```

  - .prop
    被用于绑定 DOM 属性 (property)
    ```html
    <div v-bind:text-content.prop="text"></div>
    ```
    
  - .sync
    讲解组件时再说

# v-on
- v-on 指令可以监听 DOM 事件，并在触发时运行一些 JavaScript 代码
- 事件类型由参数指定
```html
<div class="demo">
        <button v-on:click="msg += 1">点击</button>
        <p>点击{{ msg }}次</p>
    </div>
    <script>
        let vm = new Vue({
            el: ".demo",
            data: {
                msg: 0
            }
        })
    </script>
```
## methods
- 但是很多事件处理逻辑是非常复杂的，所以直接把 JavaScript 代码写在 v-on 指令中是不可行的。所以 v-on 还可以接收一个需要调用的方法名称。

```html
    <div class="demo">
        <!-- addMsg 是methods中定义的方法名 -->
        <button v-on:click="addMsg">点击</button>
        <p>点击{{ msg }}次</p>
    </div>
    <script>
        let vm = new Vue({
            el: ".demo",
            data: {
                msg: 0
            },
            //在methods中定义方法
            methods:{
                addMsg:function(e){
                    //this在方法里指向当前Vue实例
                    this.msg +=1
                    //e是原生DOM事件
                    console.log(e.target)
                    
                }
            }
        })
    </script>
```
- methods中的函数，也会直接代理给Vue实例对象，所以可以直接运行：
  ```js
    vm.addCounter();
  ```

- 除了直接绑定到一个方法，也可以在内联JavaScript 语句中调用方法：
```html
    <div class="demo">
        <!-- addMsg 是methods中定义的方法名 -->
        <button @click="addMsg(5)">点击</button>
        <p>点击{{ msg }}次</p>
    </div>
    <script>
        let vm = new Vue({
            el: ".demo",
            data: {
                msg: 0
            },
            //在methods中定义方法
            methods:{
                addMsg:function(num){
                    //this在方法里指向当前Vue实例
                    this.msg +=num
                    //e是原生DOM事件
                    // console.log(e.target)
                    
                }
            }
        })
    </script>
```
- 在内联语句中使用事件对象时，可以利用特殊变量 $event:
```html
    <div class="demo">
        <button @click="addMsg(5,$event)">点击</button>
        <p>点击{{ msg }}次</p>
    </div>
    <script>
        let vm = new Vue({
            el: ".demo",
            data: {
                msg: 0,
                event:"click"
            },
            methods:{
                addMsg:function(num,e){
                    this.msg +=num
                    console.log(e.target)
                    
                }
            }
        })
    </script>
```
- 可以绑定动态事件，Vue版本需要2.6.0+

```html
    <div class="demo">
        <button v-on:[event]="addMsg">点击</button>
        <p>点击{{ msg }}次</p>
    </div>
    <script>
        let vm = new Vue({
            el: ".demo",
            data: {
                msg: 0,
                event:"click"
            },
            methods:{
                addMsg:function(e){
                    this.msg +=1
                    console.log(e.target)
                    
                }
            }
        })
    </script>
```


- 可以不带参数绑定一个对象，Vue版本需要2.4.0+。
  - { 事件名：事件执行函数 }
  - 使用此种方法不支持函数传参&修饰符
  ```html
  <div v-on="{ mousedown: doThis, mouseup: doThat }"></div>
  ```
- v-on指令简写：```@```

## 为什么在 HTML 中监听事件?
1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试
3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们



