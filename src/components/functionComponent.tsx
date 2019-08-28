
import * as React from 'react';
import { Button } from 'antd';

// React.FC  React.FunctionComponent 的简写,应该返回一个节点   注意此时文件后缀名是 .tsx
const App:React.FC<string> = (message) => {
  return (
    <div>{message}</div>
  )
}
const App2:React.FC<{title:string}> = ({title}) => {
  return (
    <div>{title}</div>
  )
}

// 默认属性 ,使用默认属性，不要使用React.FC; 类似接口继承的功能
const defaultProps ={
  who:"Jone"
}
type Props = {age:number} & typeof defaultProps;

const Greet =(props:Props) => {

}
Greet({age:12,who:'adaa'})

// React.FC 写法
type Name ={
  name:string
}

type Age = {
  age:string
}

//
const Human:React.FC<Name & Age> =(name,age) => <div>{name+age}</div>



type Props1 = {
  children:React.ReactNode
}
type Ref = HTMLDivElement;
const HOCComponent = React.forwardRef<Ref,Props1>((props,ref)=>(
  <div ref={ref}>{props.children}</div>
))
