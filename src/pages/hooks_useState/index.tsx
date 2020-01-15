import React,{useState, useEffect} from 'react';
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

      const [obj,setObj] =useState({ // 可以是一个回调
        name:'name',
        age:12
      });

      const [person,setPerson] = useState({
        name:'不必存储多个state',
        age:12,
        job:'哈哈哈'
      }); // 不必设置多个state
      debugger;
      // 检测值改变，并不是值本身变不变，而是 setObj 触发了，里面的值如果是 obj（已经缓存了） ,才默认不变。   而写的全新的对象，哪怕和obj一样，也认为是全新的更新。
      useEffect(()=>{
        console.log('触发了',obj)
      },[obj])

      // 初始值也可以通过延迟计算获得,类似vue的计算属性功能
      const [init,setInit] = useState(()=> {
          return computedInit(props.name)
      })
      const handleObjChange = () =>{
        let age =100+person.age;
        setPerson({
          ...person,
          age
        })
      }
      useEffect(()=>{
        console.log('触发了奥------')
      })

    return (
      <div>
        <div>useState 使用，状态改变 {`${value}`}</div>
        <div> 使用先前的值{`${prevValue}`}</div>
        <button onClick={()=>{setValue('改变值2')}} >点击开始改变state</button>
        {/* 可以使用是之前的上一次的state */}
        <button onClick={()=>{setPrevValue(prev => prev + '-'+ prevValue)}} >点击使用先前的值</button>
        <button onClick={()=>{setObj({name:'name',age:12})}} >对象触发了</button>
        <div>
        {
          `${person.name}-${person.age}-${person.job}`
        }
        <button onClick={handleObjChange} >点击对象改变了</button>
        </div>

      </div>
    )
 }

