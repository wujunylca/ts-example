import React,{useState} from 'react';
import dva, { connect } from 'dva';
import { Button } from 'antd';

// hooks 特点   将UI和状态相分离，renderprops 和高阶组件的混合体

// 不存在ui ,以 use开头封装功能（有状态的组件没有渲染，仅仅处理数据）， 存在UI,封装成组件；（有渲染的组件没有状态，仅仅渲染数据）

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

