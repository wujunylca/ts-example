import React,{createContext,useState,useContext} from 'react';




// const  Counter:React.FC =  () => {
//   const count = useContext(CountContext);
//   return (
//     <h1>
//         子组件接受{count }
//     </h1>
//   )
// }
// // createContext 是一个泛涵，会默认接受一个参数。这个参数的关注点就是：你要传递传递值的类型，而不是值本身
// const CountContext = createContext(0);
// const Example:React.FC = () => {
// const [count,setCount]  = useState(0);
//   return (
//     <div>
//       <p> click {count} times</p>
//       <button onClick={()=>{setCount(count+1)}}>click me</button>
//       <CountContext.Provider value={count}>
//         <Counter />
//       </CountContext.Provider>
//     </div>
//   )
// }
// 这种方式不推荐，组合传值
const  Counter1:React.FC<{count:number}> =  ({children, count}) => {
  return (
    <h1>
        子组件接受{count }
        {children}
    </h1>
  )
}
// createContext 是一个泛涵，会默认接受一个参数。这个参数的关注点就是：你要传递传递值的类型，而不是值本身
const Example1:React.FC = () => {
const [count,setCount]  = useState(0);
  return (
    <div>
      <p> click {count} times</p>
      <button onClick={()=>{setCount(count+1)}}>click me</button>
      <Counter1 count={count} >
        <div>我是children ，但是我也能接受用count:{count} </div>
      </Counter1>
    </div>
  )
}


export default Example1;
