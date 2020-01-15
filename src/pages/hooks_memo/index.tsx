
import React,{useEffect,useState, useMemo,FC} from 'react';
// import dva, { connect } from 'dva';
import useTitle from '../../components/useTitle';
import { Button } from 'antd';
// import {a} from './a';


// console.log('全局变量',a)

type NameType = {
  name:string,
  children:React.ReactNode,
  // onhandleChange:Function
}

// 两种写法
function createArray<T>(value:T) {
  console.log('value',value);
}
// 函数表达式的形式
const createA:<T>(value:T) => void = (value) => {
  console.log('value2',value)
}

createArray<string>('ddd');
createArray<number>(123);
createA('ddd');
createA(123)

// 多类型参数

const swap:<T,U>(a:T,b:U) => U  =(a,b) => {
  return  b;
}
// 约束 范型

interface Length {
  length:number;
}

const consoleLength:<T extends Length> (params:T) => void = (params) => {
  console.log('params',params.length)
}

consoleLength({length:2,name:'123'})
consoleLength({length:2,name:12})

// 范型接口,好处是，每一个定义的属性，都可以拿到当前的参数

interface Search<T> {
  item: T,
  renderItem: <U>(value:(T | U ) ) => void;
}

// const Com:FC<Search> =({faa,name}) => {
//   faa(name)
//   return (
//     <div>ddd</div>
//   )
// }



// 函数用 useCallBack 包裹 返回是一个函数； 返回一个值，用 useMemo 包裹

// 记忆组件
function NameContent({name,children}:NameType) {
  function changeName(name:string) {
    console.log('11')
    // onhandleChange('返回给父组件的值');
    return name + '改变name的方法'
  }
  useEffect(()=> {
    console.log('数据更新了')
  },[])
  // console.log('调用useTitle',useTitle(1001))
  // const otherName =  changeName(name)   这种方式，点击内容的时候，会触发changeName 调用，实际这不应该调用，
  // useCallback(fn,inputs) =  useMemo=(()=>fn,inputs) 检测函数参数，改变的时候才会调用. 这种方式一般用 useState 使用解决
  const otherName =  useMemo(()=> changeName(name),[name]);
  console.log('22222')
  return (
    <div>
      {otherName}
      {/* <Com name='dd' faa={(value) => { console.log('value-----',value) }} /> */}
        {/* <div>{otherName}</div> */}
        <div>{children}</div>
    </div>
  )
}

const NewNameContent = React.memo(NameContent);

const F =() => {
  return (
    <div>dgs</div>
  )
}

console.log(typeof F, F instanceof Object)

 function HooksExample () {
    const [name,setName] = useState('名字');
    const [content,setContent] = useState('内容');
    const [content2,setContent2] = useState('内容');
    const childrenName = useMemo(() => <NameContent  name='ddd' >{'12'}</NameContent> ,[])
    return (
      <div>
        <Button onClick ={()=> setContent2('ddd')}>名字</Button>
        <Button onClick ={()=> setContent("内容改变了")}>内容</Button>
        {childrenName}
        {/* <NameContent name={content2} >{9999}</NameContent> */}
        {/* <NewNameContent name={content2} >{9999}</NewNameContent> */}
      </div>
    )
 }

export default HooksExample
