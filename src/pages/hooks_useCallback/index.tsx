
import React,{useCallback,useState,useEffect} from 'react';

// useMemo 是缓存变量  useCallback 是缓存方法

function Counter() {
  const [count, setCount] = useState(0);

  //  useEffect 更新需要依赖变量，，如果想把函数抽离出去使用的话，经过 useCallback 包装过的函数可以当作普通变量作为 useEffect 的依赖
  // useEffect(() => {
  //   function getFetchUrl() {
  //     return "https://v?query=" + count;
  //   }

  //   getFetchUrl();
  // }, [count]);

  const getFetchUrl = useCallback(() => {
    console.log('count',count)
  },[count])

  useEffect (()=>{
    getFetchUrl();
  },[getFetchUrl])



  return <h1 onClick={()=>{setCount(count+1)}}>{count}</h1>;
}

export default Counter;
