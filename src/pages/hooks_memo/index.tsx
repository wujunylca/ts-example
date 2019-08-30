
import React,{useEffect,useState, useMemo} from 'react';
// import dva, { connect } from 'dva';
import useTitle from '../../components/useTitle';
import { Button } from 'antd';

type NameType = {
  name:string,
  children:React.ReactNode,
  onhandleChange:Function
}

function NameContent({name,children,onhandleChange}:NameType) {
  function changeName(name:string) {
    console.log('11')
    onhandleChange('返回给父组件的值');
    return name + '改变name的方法'
  }
  console.log('调用useTitle',useTitle(1001))
  // const otherName =  changeName(name)   这种方式，点击内容的时候，会触发changeName 调用，实际这不应该调用，
  // useCallback(fn,inputs) =  useMemo=(()=>fn,inputs) 检测函数参数，改变的时候才会调用. 这种方式一般用 useState 使用解决
  const otherName =  useMemo(()=> changeName(name),[name]);

  return (
    <div>
        <div>{otherName}</div>
        <div>{children}</div>
    </div>
  )
}


 function HooksExample () {
    const [name,setName] = useState('名字');
    const [content,setContent] = useState('内容');
    return (
      <div>
        <Button onClick ={()=> setName("名字改变了")}>名字</Button>
        <Button onClick ={()=> setContent("内容改变了")}>内容</Button>
        <NameContent name={name} onhandleChange={(value:string)=> {console.log(value)}} >{content}</NameContent>
      </div>
    )
 }

export default HooksExample
