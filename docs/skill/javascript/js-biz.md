# JavaScript 基础

JavaScript 是一款运行在浏览器上的轻量级脚本语言，服务器运行的 JavaScript 称为 nodeJS

JavaScript 是一种弱类型语言，变量类型由值决定，其在前端的作用主要是是嵌入在网页中和用户进行交互（DOM 文档，BOM 浏览器操作，事件，Ajax）

JavaScript 可以写在以下地方：

1. 写在 html 文件中的 script 标签内部
2. 写在 js 文件中通过 script 标签引入 html
3. 写在标签中的事件内
4. 写在 a 标签的 href 属性内

## 数据类型

JavaScript 数据类型分为两大类：基本数据类型和引用数据类型

### 基本数据类型

基本数据类型包括：number、string、boolean、null、undefined、symbol、bigint

#### number

number 类型包括整数和浮点数，整数包括正整数、负整数和 0，浮点数包括小数和科学计数法

```javascript
// 整数
let a = 1;
// 浮点数
let b = 1.1;
// 科学计数法
let c = 1e2;
```

#### string

string 类型包括单引号、双引号和反引号包裹的字符串

```javascript
// 单引号
let a = "hello";
// 双引号
let b = "world";
// 反引号
let c = `hello world`;
```

#### boolean

boolean 类型只有两个值：true 和 false

```javascript
let a = true;
let b = false;
```

#### null

null 类型只有一个值：null，表示空值

```javascript
let a = null;
```

#### undefined

undefined 类型只有一个值：undefined，表示未定义

```javascript
let a;
```

#### symbol

symbol 类型表示独一无二的值，通过 Symbol 函数生成

```javascript
let a = Symbol();
```

#### bigint

bigint 类型表示任意精度的整数，通过 BigInt 函数生成

```javascript
let a = BigInt(1);
```

### 引用数据类型

引用数据类型包括：object、array、function

#### object

object 类型表示对象，包括普通对象、数组、函数等

```javascript
// 普通对象
let a = {
  name: "hello",
  age: 18,
};
// 数组
let b = [1, 2, 3];
// 函数
let c = function () {
  console.log("hello world");
};
```

#### array

array 类型表示数组，通过[]包裹的元素集合

```javascript
let a = [1, 2, 3];
```

#### function

function 类型表示函数，通过 function 关键字定义的函数

```javascript
let a = function () {
  console.log("hello world");
};
```

## this 指向

所有的全局变量和方法前面都省略了一个 window。

1. script 标签中的 this 是 window 对象
2. 函数中的 this：普通函数中的 this 指向 window，执行时需要看执行的环境，谁调用函数 this 就是谁
3. 对象中的函数 this 指向这个对象
4. setInterval 中的 this 指的是 window（window.setInterval）
5. 箭头函数中的 this 会继承上一层作用域中的 this（指向声明地方的 this）
6. 类中的 this 指向的是它的实例
7. call、bind、apply 可以改变函数中的 this 指向，call 中的 this 指向 call 的第一个参数，后续参数为原函数的参数

## 原型和原型链

### 原型

1.每个函数 | 类都有一个显式原型 prototype 2.每个实例都有一个隐式原型**proto** 3.实例的隐式原型**proto**等于对应函数 | 类的显式原型 prototype

### 原型链

当获取对象的属性 | 方法的时候，先在自身对象上查找不到则向上查找隐式元素**proto**直到**proto**为 null 为止
把由**proto**组成的链条关系称为原型链
js 对象通过**proto**原型链实现了继承

## 闭包

闭包是指有权访问另一个函数作用域中的变量的函数，通常是在一个函数内部定义另一个函数，内部函数可以访问外部函数的变量，即使外部函数已经执行完毕，内部函数仍然可以访问外部函数的变量，这就是闭包。

闭包的作用：

1. 可以访问函数内部的变量
2. 可以让这些变量始终保持在内存中，不会被垃圾回收机制回收
3. 可以实现私有变量和私有方法

闭包的缺点：

1. 占用内存，容易造成内存泄漏
2. 闭包会使函数中的变量始终保持在内存中，如果使用不当，可能会导致内存泄漏
3. 闭包会使代码难以理解和维护

## 异步编程

### 回调函数

回调函数是一种常见的异步编程方式，它指的是将一个函数作为参数传递给另一个函数，并在某个时刻调用该函数。

回调函数的优点是简单易用，但是也存在一些缺点，例如回调地狱、错误处理困难等问题。

### Promise

Promise 是一种更高级的异步编程方式，它表示一个异步操作的最终完成（或失败）及其结果值。

Promise 的优点是可以链式调用、错误处理更方便，但是也存在一些缺点，例如代码可读性差、调试困难等问题。

### async/await

async/await 是一种更高级的异步编程方式，它基于 Promise，使用起来更加简洁和直观。

async/await 的优点是可以使异步代码看起来像同步代码，代码可读性更高，调试更加方便，但是也存在一些缺点，例如错误处理需要使用 try/catch 语句，并且需要使用 babel 等工具进行编译。

## 事件循环

JavaScript 是单线程的，这意味着同一时间只能执行一个任务。为了解决这个问题，JavaScript 引入了事件循环机制。

事件循环机制主要包括以下几个步骤：

1. 执行全局代码，将全局代码放入执行栈中
2. 当执行栈为空时，检查是否有异步任务需要执行
3. 如果有异步任务需要执行，将其放入任务队列中
4. 当执行栈为空且任务队列为空时，从任务队列中取出一个任务执行
5. 重复步骤 3 和 4，直到执行栈和任务队列为空

事件循环机制使得 JavaScript 可以处理异步任务，例如定时器、网络请求等。同时，事件循环机制也使得 JavaScript 可以实现非阻塞式编程，提高程序的执行效率。

## 深拷贝和浅拷贝

### 浅拷贝

浅拷贝是指创建一个新对象，这个新对象具有和原对象相同的属性值，但是这个新对象的属性值是原对象属性的引用。也就是说，如果原对象的属性值是一个对象，那么新对象的属性值就是这个对象的引用，而不是一个新的对象。

浅拷贝的实现方式有很多种，例如使用 Object.assign() 方法、使用扩展运算符（...）等。

### 深拷贝

深拷贝是指创建一个新对象，这个新对象具有和原对象相同的属性值，但是这个新对象的属性值是原对象属性的深拷贝。也就是说，如果原对象的属性值是一个对象，那么新对象的属性值是一个新的对象，而不是原对象的引用。

深拷贝的实现方式也有很多种，例如使用 JSON.parse() 和 JSON.stringify() 方法、使用递归函数等。
