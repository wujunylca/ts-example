import React,{useState} from 'react';
import dva, { connect } from 'dva';
import { Button } from 'antd';
// 保存组件状态

// hooks 特点   将UI和状态相分离，renderprops 和高阶组件的混合体

// 不存在ui ,以 use开头封装功能（有状态的组件没有渲染，仅仅处理数据）， 存在UI,封装成组件；（有渲染的组件没有状态，仅仅渲染数据）

// 不要从常规 JavaScript 函数调用 Hooks;
// 不要在循环，条件或嵌套函数中调用 Hooks;
// 必须在组件的顶层调用 Hooks;
// 可以从 React 功能组件调用 Hooks;
// 可以从自定义 Hooks 中调用 Hooks;
// 自定义 Hooks 必须使用 use 开头，这是一种约定;


type Name ={
  name:string
}
function computedInit(value:string) {
  return '111'+value;
}

 export default function HooksUseState (props:Name) {
      const [value,setValue] = useState('开始值1'); // 基本使用
      const [prevValue,setPrevValue] = useState('prev1');
      // 初始值也可以通过延迟计算获得,类似vue的计算属性功能
      const [init,setInit] = useState(()=> {
          return computedInit(props.name)
      })

    return (
      <div>
        <div>useState 使用，状态改变 {`${value}`}</div>
        <div> 使用先前的值{`${prevValue}`}</div>
        <button onClick={()=>{setValue('改变值2')}} >点击开始改变state</button>
        <button onClick={()=>{setPrevValue(prev => prev + '-'+ prevValue)}} >点击使用先前的值</button>
      </div>
    )
 }

