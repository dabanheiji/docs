---
title: 逻辑复用
---

# 逻辑复用

在我们平时写业务代码的时候，经常会遇见一些非常类似的场景，而这些场景的业务代码也会有很大程度上的相似，所以很多时候直接把以前的代码复制过来然后修改一下就可以了，然而复制粘贴自然会让我们的项目代码中充斥这很多重复的东西，这样看起来是非常不优雅的，首先是这样会使得我们的代码非常的臃肿，其次是这样的代码也并不方便其他开发同事维护，所以想办法把这些逻辑类似的代码复用起来就显得非常有必要。

## HOC

在最初React中会使用Mixins的方式实现逻辑的复用，但是这种复用方式问题太多，在后面就被放弃了，随之兴起的是一种叫做高阶组件的方式来复用某些逻辑，也就是HOC。高阶组件之所以叫高阶组件是因为它的实现方式和JavaScript中的高阶函数类似，故而称之为高阶组件。
而所谓的高阶组件，就是一个函数，只是这个函数的入参是一个React组件，这个组件的返回值也是一个React组件，这样接受一个组件并返回一个新的组件的函数就被我们称为高阶组件。
而因为我们可以在返回的这个组件中书写某些逻辑，所以这样就能够将需要复用的逻辑写在高阶组件中以实现逻辑的复用，举个例子：
假设我们现在页面上有两个组件，组件A和组件B，两个组件的功能分别如下：

组件A：在页面中展示鼠标在当前页面中的坐标。
组件B：会随着鼠标而移动

需求分析：
组件A中我们需要展示鼠标的坐标，所以我们需要在鼠标移动的时候去获取鼠标的坐标位置然后将获取到的位置坐标展示在页面上，而在组件B中我们同样需要去获取鼠标的位置，然后将组件B的定位坐标设置为获取到的鼠标位置。
从上面的需求分析中我们可以看的出来，我们在组件A和组件B中都需要去获取鼠标的位置，所以我们可以把获取鼠标位置的逻辑抽离成一个高阶组件，以便复用。

::: code-group
```js [withMouse.js]
// 封装获取鼠标坐标的高阶组件
import React from 'react'

export default function withMouse(Component) {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                x: 0,
                y: 0
            }
        }
        
        // 需要绑定的事件
        handleMouse = e => {
            this.setState({
                x: e.pageX,
                y: e.pageY,
            })
        }
        
        componentDidMount () {
            // 组件挂载后绑定事件获取鼠标坐标
            document.addEventListener('mousemove', this.handleMouse)
        }
        
        componentWillUnmount () {
            // 组件卸载后清除绑定事件
            document.removeEventListener('mousemove', this.handleMouse)
        }
        
        render() {
            return (
                <Component
                    x={this.state.x}
                    y={this.state.y}
                />
            )
        }
    }
}
```

```js [A.jsx]
// A.jsx
import React from 'react'
import withMouse from '@/hoc/withMouse'

function A ({ x, y }) {
    return (
        <div>
            {`鼠标坐标 x: ${x} y: ${y}`}
        </div>
    )
}

export default withMouse(A)
```

```js [B.jsx]
// B.jsx
import React from 'react'
import withMouse from '@/hoc/withMouse'

function B ({ x, y }) {
    return (
         <span
            style={{
                color: 'red',
                fontSize: 18,
                position: 'absolute',
                top: y,
                left: x,
            }}
         >
              { 'HOC组件B' }
         </span>
    )
}

export default withMouse(B)
```
:::

当然高阶组件也是存在一些缺点的：

会增加组件树的层级
存在命名冲突的问题
数据来源不够清晰，使用多个高阶的时候数据难以溯源。

## render props

而render props则是另外一种复用逻辑的方式，它的思想与高阶组件比较类似，但是它解决了hoc中存在的一些问题，render props接受一个函数类型的prop并且在组件内部会通过调用这个prop来渲染内容，我们最长使用的render props就是antd中的Table组件，它的Table.Column提供了一个render的prop，我们可以通过render属性来完成一些自定义的渲染。接下来我们可以使用render props来实现上面的鼠标案例

首先我们需要将复用的那一段逻辑写在render props组件中

::: code-group
```jsx [index.jsx]
import React from 'react'
export default class extends React.Component {
    render () {
        return (
            <MousePropsComponent>
                {
                    ({ x, y }) => (
                        <>
                            <A x={x} y={y} />
                            <B x={x} y={y} />
                        </>
                    )
                }
            </MousePropsComponent>
        )
    }
}
```

```jsx [MousePropsComponent.jsx]
import React from 'react'

class MousePropsComponent extends React.Component {
    constructor(props) {
            super(props)
            this.state = {
                x: 0,
                y: 0
            }
        }
        
        // 需要绑定的事件
        handleMouse = e => {
            this.setState({
                x: e.pageX,
                y: e.pageY,
            })
        }
        
        componentDidMount () {
            // 组件挂载后绑定事件获取鼠标坐标
            document.addEventListener('mousemove', this.handleMouse)
        }
        
        componentWillUnmount () {
            // 组件卸载后清除绑定事件
            document.removeEventListener('mousemove', this.handleMouse)
        }
        
        render() {
            return this.props.children({ x: this.state.x, y: this.state.y })
        }
}

export default MousePropsComponent
```

```jsx [A.jsx]
import React from 'react'
import MousePropsComponent from '@/render-props/mouse-props-component'

export default function A ({ x, y }) {
    return (
        <div>
            {`鼠标坐标 x: ${x} y: ${y}`}
        </div>
    )
}
```

```jsx [B.jsx]
import React from 'react'
import MousePropsComponent from '@/render-props/mouse-props-component'

export default function B ({ x, y }) {
    return (
         <span
            style={{
                color: 'red',
                fontSize: 18,
                position: 'absolute',
                top: y,
                left: x,
            }}
         >
              { 'render props 组件B' }
         </span>
    )
}
```
:::

render props就很好的解决了数据来源不清晰，以及命名容易冲突的这一类问题，不过它仍然存在一些问题：

嵌套的方式不太好，如果使用多个render props组件，会导致嵌套过深，增加阅读成本
无法在return之外的地方使用父组件中传入的数据与方法。

## hooks

hooks是React16.8提出的另外一种复用逻辑的方案，也是目前最推荐的一种方案，并且vue3中也开始使用hooks风格的开发方式足以看出hooks是未来的大势所趋，使用hooks实现上面的案例也非常的简单

::: code-group
```jsx [index.jsx]
import React from 'react'

export default function App() {
    return (
        <>
            <A/>
            <B/>
        </>
    )
}
```

```js [useMouse.js]
import React, { useState, useEffect, useCallback } from 'react'

export default function useMouse () {
    const [mouse, setMouse] = useState({ x: 0, y: 0 })
    
    const handleMouse = useCallback((e) => {
        setMouse({
            x: e.pageX,
            y: e.pageY,
        })
    }, [])
    
    useEffect(() => {
        // 组件挂载后绑定事件获取鼠标坐标
        document.addEventListener('mousemove', handleMouse)
        return () => {
            // 组件卸载后清除绑定事件
            document.removeEventListener('mousemove', handleMouse)
        }
    }, [])
    
    return mouse;
}
```

```jsx [A.jsx]
import React from 'react'
import useMouse from './useMouse'

export default function A () {
    const { x, y } = useMouse()
    
    return (
        <div>
            {`鼠标坐标 x: ${x} y: ${y}`}
        </div>
    )
}
```

```jsx [B.jsx]
import React from 'react'
import useMouse from './useMouse'

export default function B () {
    const { x, y } = useMouse()
    
    return (
         <span
            style={{
                color: 'red',
                fontSize: 18,
                position: 'absolute',
                top: y,
                left: x,
            }}
         >
              { 'render props 组件B' }
         </span>
    )
}
```
:::

可以看出经过hooks方式的逻辑抽离之后组件会变得非常清爽，而且数据来源非常清晰，并且没有了烦人的this，当然hooks也存在一些缺点，遇见一些特殊场景还是需要使用class组件的写法，比如hooks无法覆盖所有的生命周期，比如错误边界目前就只能使用class组件来实现。

