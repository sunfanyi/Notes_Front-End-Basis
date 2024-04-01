# DOM Basis

- Document Object Model 文档对象模型



DOM 结构：

![image-20240401213550977](assets/image-20240401213550977.png)



<img src="assets/image-20240401215617427.png" alt="image-20240401215617427" style="zoom:50%; border: 0.5px solid rgb(205, 204, 204); border-radius: 10px;"/>



# 1. 选择 element

示例 HTML：

![image-20240401221157152](assets/image-20240401221157152.png)

## .getElementsByTagName()

-> 返回一个collection

<img src="assets/image-20240401215213420.png" alt="image-20240401215213420" style="zoom: 55%; border: 0.5px solid rgb(205, 204, 204); border-radius: 10px;"/>

其他还有：

<img src="assets/image-20240401215515238.png" alt="image-20240401215515238" style="zoom: 80%; border: 0.5px solid rgb(205, 204, 204); border-radius: 10px;"/>

<img src="assets/image-20240401220022216.png" alt="image-20240401220022216" style="zoom:80%; border: 0.5px solid rgb(205, 204, 204); border-radius: 10px;"/>



## .querySelector()

- 更方便且常用

- 默认值选择符合条件的第一个，不会返回collection
- 可同时作用于 tag, class, id，本质是CSS选择器的方法（. 或 # 的前缀）

<img src="assets/image-20240401220215221.png" alt="image-20240401220215221" style="zoom: 60%; border: 0.5px solid rgb(205, 204, 204); border-radius: 10px;"/>

可以使用 querySelectorAll() 以返回多个：

<img src="assets/image-20240401220950661.png" alt="image-20240401220950661" style="border: 0.5px solid rgb(205, 204, 204); border-radius: 5px;"/>



# 2. 修改 element

- CSS 只负责初始状态，JavaScript 负责交互；
- 所有 CSS style 都可以改；

- CSS 通常有dash，JavaScript 通常是驼峰命名法（background-color vs backgroundColor）。

Cheatsheet：

- https://www.w3schools.com/jsref/dom_obj_style.asp

## 2.1. 修改 CSS 内容

<img src="assets/image-20240401223207489.png" alt="image-20240401223207489" style="zoom:67%; border: 0.5px solid rgb(205, 204, 204); border-radius: 10px;"/>



也可以在console里直接改，但仅是临时的：

<img src="assets/image-20240401223731282.png" alt="image-20240401223731282" style="zoom:67%; border: 0.5px solid rgb(205, 204, 204); border-radius: 10px;"/>



## 2.2. 修改文本内容

<img src="assets/image-20240401230203924.png" alt="image-20240401230203924" style="zoom:67%; border: 0.5px solid rgb(205, 204, 204); border-radius: 10px;"/>



# 3. 添加、移除类

假设我们要对一个 element 操作，html中未赋予类名：

![image-20240401224654362](assets/image-20240401224654362.png)

但CSS中却有对这个类的赋值：

![image-20240401224719871](assets/image-20240401224719871.png)

可以用 Js 实现添加类名，让这个heading变色，有以下不同的方法。



## 3.1. .classList.add()

<img src="assets/image-20240401224758236.png" alt="image-20240401224758236" style="zoom:67%; border: 0.5px solid rgb(205, 204, 204); border-radius: 10px;"/>

同时也可以用remove移除：

```javascript
document.querySelector('h1').classList.remove('title')
```



## 3.2. 修改 Attributes

![image-20240401230944034](assets/image-20240401230944034.png)



## 3.3. setAttributes()

<img src="assets/image-20240401231102961.png" alt="image-20240401231102961" style="zoom:67%; border: 0.5px solid rgb(205, 204, 204); border-radius: 10px;"/>



# 4. 事件交互

**.addEventListener(event_name, function)**

实现点击按钮让heading变色，借用了上一章最后的 title 类名。

<img src="assets/image-20240401225015646.png" alt="image-20240401225015646" style="zoom:87%; border: 0.5px solid rgb(205, 204, 204); border-radius: 10px;"/>

- toggle 可以切换 class 状态，上图就是先添加（heading变红）再移除（变黑）；
- 那么可以借助按钮点击的事件来执行toggle：

<img src="assets/image-20240401225513566.png" alt="image-20240401225513566" style="zoom: 67%; border: 0.5px solid rgb(205, 204, 204); border-radius: 10px;"/>



