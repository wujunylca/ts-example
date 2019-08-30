import React,{useState, useRef,useImperativeHandle,forwardRef} from 'react';
import dva, { connect } from 'dva';
import { Button,Input } from 'antd';

// ref 可变，最好整个生命周期保持一个
function ChilInput (props:any,ref:any) {
  const inputRef = useRef(null);
  useImperativeHandle(ref,()=>inputRef.current); // 父组件获取子组件,透传ref

  return <Input name='sdfsf' ref={inputRef} />
}


const ChildrenInput = forwardRef(ChilInput);
 export default function HooksRef () {
  // 保存引用值
  // const inputRef = useRef(null);
  const childRef = useRef(null);
  // const {current}:any = inputRef;
  // const {current}:any = childRef;

    return (
      <>
        {/* <Button type='primary' onClick={()=>{console.log(current.focus())}} >点击调用子组件</Button> */}
        <Button type='primary' onClick={()=>{console.log(childRef.current)}} >透传子组件</Button>
        {/* <Input ref={inputRef} /> */}
        <ChildrenInput ref={childRef} />
      </>
    )
 }

