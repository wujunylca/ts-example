import React,{useState} from 'react';
import dva, { connect } from 'dva';
import { Button } from 'antd';


 export default function HooksUseState () {
      const [value,setValue] = useState('开始值1'); // 基本使用
      const [prevValue,setPrevValue] = useState('prev1');


    return (
      <div>
        <div>useState 使用，状态改变 {`${value}`}</div>
        <div> 使用先前的值{`${prevValue}`}</div>

        <button onClick={()=>{setValue('改变值2')}} >点击开始改变state</button>
        <button onClick={()=>{setPrevValue(prev => prev + '-'+ prevValue)}} >点击使用先前的值</button>
      </div>
    )
 }

