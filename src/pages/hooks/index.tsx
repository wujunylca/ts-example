import React,{useEffect} from 'react';
import dva, { connect } from 'dva';
import { Button } from 'antd';

interface Props {
  hooks:{
    count:number
  },
  dispatch:Function
}
// hooks 特点   将UI和状态相分离，renderprops 和高阶组件的混合体

// 不存在ui ,以 use开头封装功能（有状态的组件没有渲染，仅仅处理数据）， 存在UI,封装成组件；（有渲染的组件没有状态，仅仅渲染数据）
 function HooksExample ({hooks,dispatch}:Props) {
  const {count} = hooks;
  //  console.log('ssssssssss',props)
   useEffect(()=>{
      console.log('ddddd',count)
   },[count])

    return (
      <div>
        reducer 的值 {hooks.count}
        <button onClick={()=> {dispatch({type:'hooks/add'})}}>点击开始存储count</button>
      </div>
    )
 }

export default connect(({hooks,dispatch}:Props)=>({hooks,dispatch}))(HooksExample)
