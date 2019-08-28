import React,{useState,useEffect} from 'react';
import router from 'umi/router';

type Props = {
  count:number
}

function handleRouter() {
  router.push('/formExample');
}
function Example(props:Props) {
  const [count, setCount] = useState(props.count);
  console.log('22222',count)
  // 总会执行一次
  // 检测count值改变后再会调用。 生命周期的作用
  useEffect(()=> {
    console.log('11111111111')
    return () => {
      // debugger;
      console.log('fffffff')
    }
  },[props.count]) // 检测属性变化会调用，return 会在 组件销毁后执行; 若检测count,count只要改变就会触发useEffect调用

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleRouter}>跳转</button>
    </div>
  );
  }
export default Example;

