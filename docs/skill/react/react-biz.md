# React 基础知识

## React 特点

- React 是用来构建用户的 js 库
- React 的设计思想是组件化开发，以及单向数据流
- 使用 jsx 语法，可以在 js 中编写 html 模板
- 使用虚拟 dom，用 js 对象模拟 dom 节点，优化 dom 操作

## JSX 语法

React 中使用了 jsx，当然 React 并不强制你使用 jsx，但是不使用 jsx 的话会降低代码的可读性，所以更加推荐使用 jsx，jsx 语法可以在 js 中编写 html 代码，十分灵活，你可以尽情发挥你天马行空的想象力去编写代码

## 组件

React 中的组件分为类组件和函数组件，类组件使用 ES6 的 class 语法来定义，函数组件使用 ES6 的箭头函数来定义

### 类组件

```jsx
//引入react和组件方法
import React, { Component } from "react";

//创建有状态组件
class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {}; //组件状态
  }
  render() {
    return <div>有状态组件</div>;
  }
}

export default Child;
```

### 函数组件

```jsx
import React from "react";

//创建无状态组件
const Child = (props) => {
  return <div>无状态组件</div>;
};

export default Child;
```

### 组件通讯

#### 父子组件通讯

父组件通过 props 向子组件传递数据，子组件通过 props 接收父组件传递的数据

::: code-group

```jsx [Parent.jsx]
//父组件
import React, { Component } from "react";
import Child from "./Child";

class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "父组件传递的数据",
    };
  }
  render() {
    return (
      <div>
        <Child msg={this.state.msg} />
      </div>
    );
  }
}

export default Parent;
```

```jsx [Child.jsx]
//子组件
import React from "react";

const Child = (props) => {
  return <div>{props.msg}</div>;
};

export default Child;
```

:::

#### 子组件通讯父组件

子组件向父组件传递数据可以直接通过事件传递的方式进行通讯，可以向子组件中传入一个事件，然后在子组件中调用父组件传入的事件将数据传入父组件

::: code-group

```jsx [Parent.jsx]
//父组件
import React, { Component } from "react";
import Child from "./Child";

class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "父组件传递的数据",
    };
  }

  handleClick = (msg) => {
    this.setState({
      msg,
    });
  };

  render() {
    return (
      <div>
        <Child handleClick={this.handleClick} />
      </div>
    );
  }
}

export default Parent;
```

```jsx [Child.jsx]
//子组件
import React from "react";

const Child = (props) => {
  return (
    <button onClick={() => props.onClick("子组件传递给父组件的数据")}>
      Child
    </button>
  );
};

export default Child;
```

:::

#### 跨层级通讯

跨层级通讯可以通过`context`进行通讯，`context`可以理解为全局变量，可以在任意组件中获取到

```jsx
import React, { useState, createContext, useContext } from "react";

//创建
const CountContext = createContext();

function Hook() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>父组件：{count}</p>
      <button
        onClick={() => {
          setCount((x) => x + 1);
        }}
      >
        按钮
      </button>

      {/*传递数据*/}
      <CountContext.Provider value={count}>
        <Child />
      </CountContext.Provider>
    </div>
  );
}

function Child() {
  //接收数据
  let count = useContext(CountContext);
  return <div>子组件：{count}</div>;
}

export default Hook;
```
