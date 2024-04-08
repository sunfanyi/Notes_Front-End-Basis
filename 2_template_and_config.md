# 二. 模板与样式



# 1. WXML 模板语法

## 1.1. 数据绑定

- 在 data 中定义数据
- 在 WXML 中使用数据



**在 data 中定义页面的数据:**

在页面对应的 .js 文件中，把数据定义到 data 对象中即可：

```javascript
Page({
  data: {
    info: 'hello world',
    imgSrc: '/images/profile_pic.jpg',
    randNum1: Math.random() * 10,
    randNum2: Math.random().toFixed(2),
 })
```



**Mustache 语法的格式:**

把data中的数据绑定到页面中渲染，使用 Mustache 语法（双大括号）将变量包起来即可。语法格式为：

```html
<view>{{info}}</view>
<image src="{{imgSrc}}" mode="aspectFit"></image>
<view>{{randNum1 > 5? '>5' : '<=5'}}</view>
<view>{{randNum1 * 100}}</view>
```



以上对应 Mustache 的四种应用场景：

1. 绑定内容

2. 绑定属性

3. 三元运算

4. 算术运算

   

## 1.2. 事件绑定

### 1.2.1. 事件介绍

事件是渲染层到逻辑层的通讯方式。通过事件可以将用户在渲染层产生的行为，反馈到逻辑层进行业务的处理。

<img src="assets/2_template_and_config/image-20240407232908968.png" alt="image-20240407232908968" style="zoom:67%;" />

**小程序中常用的事件**

![image-20240407232925262](assets/2_template_and_config/image-20240407232925262.png)



**事件对象的属性列表**

当事件回调触发的时候，会收到一个事件对象 event

![image-20240407232952539](assets/2_template_and_config/image-20240407232952539.png)



**target 和 currentTarget 的区别**

target 是触发该事件的源头组件，而 currentTarget 则是当前事件所绑定的组件。举例如下：

![image-20240407233012255](assets/2_template_and_config/image-20240407233012255.png)

点击内部的按钮时，点击事件以冒泡的方式向外扩散，也会触发外层 view 的 tap 事件处理函数。
此时，对于外层的 view 来说：

- e.target 指向的是触发事件的源头组件，因此，e.target 是内部的按钮组件
- e.currentTarget 指向的是当前正在触发事件的那个组件，因此，e.currentTarget 是当前的 view 组件



### 1.2.2. bindtap 的语法格式

通过 bindtap，可以为组件绑定 tap 触摸事件:

```html
<button type="primary" bindtap="btnTapHandler">按钮</button>
```

```javascript
Page({
  data: {
  },

  // 定义按钮的事件处理函数
  btnTapHandler(e) {
      console.log(e)
  },
```

console输出：

![image-20240407233333837](assets/2_template_and_config/image-20240407233333837.png)



### 1.2.3. 为 data 中的数据赋值

通过调用 this.setData(dataObject) 方法，可以给页面 data 中的数据重新赋值，示例如下：

```javascript
  btnChangeCount () {
      this.setData({
          count: this.data.count + 1
      })
  },
```



### 1.2.4. 事件传参

可以为组件提供 data-* 自定义属性传参，其中 * 代表的是参数的名字：

- val_to_add会被解析为参数的名字
- 数值 2 会被解析为参数的值

```html
<button type="primary" bindtap="btnPassParameter" data-val_to_add="{{2}}">传参按钮</button>
```

通过 event.target.dataset.参数名 即可获取到具体参数的值：

```javascript
  btnPassParameter (e) {
    console.log('value to add:', e.target.dataset.val_to_add)
    this.setData({
        count: this.data.count + e.target.dataset.val_to_add
    })
    console.log('result:', this.data.count)
  },
```



### 1.2.5. bindinput 的语法格式

```html
<input bindinput="inputConsoleLog"></input>
```

通过 event.detail.value 即可获取到文本框最新值：

```javascript
  inputConsoleLog(e) {
    console.log(e.detail.value)
  },
```



### 1.2.6. 文本框数据同步

传入文本框默认值：

```html
<input value="{{inputMsg}}" bindinput="inputUpdateData"></input>
```

更新到data：

```javascript
  inputUpdateData(e) {
      this.setData({
          inputMsg: e.detail.value
      })
  },
```





## 1.3. 条件渲染

**wx:if**

```html
<button type="primary" bindtap="btnChangeType">切换type</button>
<view wx:if="{{type === 1}}">type=1</view>
<view wx:elif="{{type === 2}}">type=2</view>
<view wx:else>type=3</view>
```

```javascript
  btnChangeType() {
    var a = [1, 2, 3];
    this.setData({
        type: this.data.type = a[this.data.type % 3]
    })
  },
```

<img src="assets/2_template_and_config/image-20240408215531185.png" alt="image-20240408215531185" style="zoom:67%;" />



**结合 <block> 使用 wx:if**

- 如果要一次性控制多个组件的展示与隐藏，可以使用一个 <block></block> 标签将多个组件包装起来，并在<block> 标签上使用 wx:if 控制属性。
- 注意： <block> 并不是一个组件，它只是一个包裹性质的容器，不会在页面中做任何渲染。
- block 和 view 包裹的区别：

```html
<block wx:if="{{true}}">
    <view>view1 using block</view>
    <view>view2 using block</view>
</block>

<view wx:if="{{true}}">
    <view>view1 using view</view>
    <view>view2 using view</view>
</view>
```

<img src="assets/2_template_and_config/image-20240408215647872.png" alt="image-20240408215647872" style="zoom:80%;" />



**hidden**

- 直接使用 hidden="{{ condition }}" 也能控制元素的显示与隐藏

- hidden 和 wx:if 的区别在于运行方式不同：

  - wx:if 以动态创建和移除元素的方式，控制元素的展示与隐藏

  - hidden 以切换样式的方式（display: none/block;），控制元素的显示与隐藏
  - 一个性能好，一个灵活。

- 使用建议

  - 频繁切换时，使用 hidden
  -  控制条件复杂时，使用 wx:if 搭配 wx:elif、wx:else 进行展示与隐藏的切换

```html
<view hidden="{{!flag}}">show by hidden</view>
<view wx:if="{{flag}}">show by wx:if</view>
```

![image-20240408215128535](assets/2_template_and_config/image-20240408215128535.png)

> 可以看到 hidden 是一直存在的，不需要重复创建。





## 1.4. 列表渲染

```javascript
data: {
    arr1: ['苹果', '华为', '小米'],
    userList: [
        {id: 1, name: 'name_a'},
        {id: 2, name: 'name_b'},
        {id: 3, name: 'name_c'},
    ],
  },
```



**wx:for**

通过 wx:for 可以根据指定的数组，循环渲染重复的组件结构:

```html
<view wx:for="{{arr1}}" wx:key="key">
    index: {{index}}, item: {{item}}
</view>
```

> 这里的 `wx:key="key"` 是为了不显示警告，貌似也可以提升效率，也就是用默认index当索引。



- 默认情况下，当前循环项的索引用 index 表示；当前循环项用 item 表示。
- 也可以使用 `wx:for-index` 和 `wx:for-item` 手动指定索引和当前项的变量名，在嵌套式方式变量名重复可以使用：

```html
<view wx:for="{{arr1}}" wx:for-index="idx" wx:for-item="itm" wx:key="key">

  index: {{idx}}, item: {{itm}}

</view>
```



**wx:key 的使用**

类似于 Vue 列表渲染中的 :key，小程序在实现列表渲染时，也建议为渲染出来的列表项指定唯一的 key 值，从而提高渲染的效率：

```html
<view wx:for="{{userList}}" wx:key="id">
    {{item.name}}
</view>
```



# 2. WXSS 模板样式

## 2.1. 

```html

```



## 2.2. 





```html

```



```html

```



```html

```



```html

```



## 2.3. 







## 2.4. 







## 2.5. 



# 3. 全局配置











# 4. 页面配置







# 5. 网络数据请求







# 6. 案例 - 本地生活（首页）

