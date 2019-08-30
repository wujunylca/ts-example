import React,{useEffect} from 'react';
import dva, { connect } from 'dva';
import { Button } from 'antd';

interface Props {
  hooks:{
    count:number
  },
  dispatch:Function
}
// useReducer  这里并不使用这个, 采用dva 的数据模型，能做更多的事
 function HooksExample ({hooks,dispatch}:Props) {
  const {count} = hooks;
  //  useEffect 一些副作用的处理地方，默认会执行一次，这里检测属性count 变化会执行， 生命周期的作用
   useEffect(()=>{
      console.log('ddddd',count)
      return  () =>  {
        console.log('组件卸下的时候会调用')
      }
   },[count])

    return (
      <div>
        reducer 的值 {hooks.count}
        <button onClick={()=> {dispatch({type:'hooks/add'})}}>点击开始存储count</button>
      </div>
    )
 }

export default connect(({hooks,dispatch}:Props)=>({hooks,dispatch}))(HooksExample)
