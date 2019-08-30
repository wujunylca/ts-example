import React,{useEffect,useState} from 'react';
import dva, { connect } from 'dva';
import route from 'umi/router';
import { Button } from 'antd';


 function HooksExample () {

  const [value,setValue] = useState('初始值');

  //  useEffect 一些副作用的处理地方，默认会执行一次，这里检测属性count 变化会执行， 生命周期的作用
   useEffect(()=>{
      // console.log('ddddd',count)

      setValue('哈哈哈哈,值改变了')
      return  () =>  {
        console.log('1111')   // 不添加检测值的时候，这里首次会执行的，组件卸载后又会调用一次
      }
   })

    return (
      <div>
        {value}
        <button onClick={()=>{route.push('/hooks_reducer')}}>点击跳转到reducer页面</button>
      </div>
    )
 }

export default connect()(HooksExample)
