import * as React from "react";

// 校验纯函数式组件  React.SFC  已弃用 React.FC
interface SFCProps {
  foo?:string
}
// 检验组件 类型是 React.SFC  校验参数是 SFCProps  后面解构就不需要检验了
const SFCComponent:React.SFC<SFCProps> = ({foo,children}) => (<div>{foo}{children}1111</div>)

//  泛函类

// 类型保护  类型别名里面 没有一个自定义组件的类型，因此可以使用typeof 类型保护
type InTypeOf = {
  Com: typeof SFCComponent;
} & {
  name:string
}

const Add:React.FC<InTypeOf> = ({Com,name}) => (<>{Com}{name}  </>)


interface ReactNode {
  name?:string;
  render:(props:any) => React.ReactNode
}

const RenderComponent:React.FC<ReactNode> = ({render,name}) => (<> {render(name)} 测试是否是节点</>)


// 泛函
const Fun1 = <T,K> (name:T,age:K): T | K | React.ReactNode  => () => {

}


// class PropsState<P extends {name:string} ,S extends {baseState:string} > extends React.Component<P,S > {
//   // constructor(props:any) {
//   //   super(props);
//   //   state ={
//   //   baseState:'sdfds'
//   //   }
//   // }
//   state:S ={
//     baseState:'sdfds'
//   }
//   foo() {

//     this.setState({baseState:"ffff"});
//   }
//   render () {
//     console.log('ssssss',this.props.name)
//     // console.log(this.state.baseState)
//     return (
//       <>
//         我是类组件
//       </>
//     )
//   }
// }
interface G {
  name:string
}
interface M {
  data:number []
}
class State extends React.Component<G,M> {
  state:M ={
    data:[]
  }
  render() {
    console.log('ds',this.props.name)
    return (
      <>
        sjf
      </>
    )
  }
}

// css

const fontWeight:React.CSSProperties = {
  fontSize:12,
  color:"red"
}

// 继承react 元素属性

interface PropsAttr  {
  hello:string
}


function Container () {
  return (
    <>
      <SFCComponent foo='sdfsdfds' > <div>我是children</div> </SFCComponent>
      {/* <PropsState name='sfdsfsf'></PropsState> */}
      <State name='sfsf'></State>
      <div style={fontWeight} >测试css</div>
      <Add Com={SFCComponent} name='测试保护类型' />
      <RenderComponent name='测试名字I' render={(name)=>(<>{name}</>)} />
    </>
  )
}

export default Container
