import * as React from 'react';
import AutoSearchLayout from '../../../src/components/AutoSearchLayout';
import { Form,Input,Icon,Button } from 'antd';
import {connect} from 'dva';
import FormInterface from '../../commonInterface/formInterface';
import { Interface } from 'readline';
import { any } from 'prop-types';
// interface IsState {
//   count:number
// }

class A {
  name:string='21';
}
class B extends A {
  age:number=12
}

class C extends B {}

// 默认函数 的返回值会根据return 判断的
function sub(x:string,y:string) {
  return x+y
}
const sub1 = (x:string,y:string) => {return 'sdfdsf'}


// 变量断言 <sting>name  somevalue as sting

// 接口
interface Name {
  name:string,
  readonly Arr:Array<any>,
   arr1:ReadonlyArray<any>, // 在对象中，其实是不起作用的
  arr2:number [],
  // (start:string):string;
  [propName:string]:any
}

let p1:Name = {
  name:'sdf',
  Arr:[1,2,'d'],
  arr1:[21],
  arr2:[12],
  ttt:'sf'
}
// p1.Arr=[12,3421];
p1.arr1=[12,324];
console.log(p1.arr1)


interface Fun {
<T>(arg:T):T
}
// 形参已经不需要验证了，默认会类型断言
const d:Fun = (name) => name;

// 类装饰器  高阶组件
const classConnect = (name:string,age:number):Function => (W:React.ComponentType) => {

  return class extends React.Component<FormInterface> {
    handleChange() {}
    handleBlur(){}
    render() {
      return <W {...this.props} {...{name,age}} />
    }
  }
}

function logClass(params:any) {
  console.log(params,'params') // params 就是当前类  // 添加属性和方法
  params.prototype.name='sds';
  params.prototype.run = function() {
    console.log('ssssss')
  }
}

/***********************ts-react-example******************************* */

// 1.函数式组件 只有props
type TestName = {
  name:string
}
const MyComponent:React.FC<TestName> = (name) => (<> 测试只有props的组件{name}</>)


// 2. 有props 和state
type Props = {
  name:string
}
type State = {
  age:number
}
// 检验参数 ，state 不检验的话会报错
class MyComponent1 extends React.Component <Props,State> {
  state:State ={
    age:12
  }
  render () {
    return (
      <>
        {this.props.name}
        {this.state.age}
      </>
    )
  }
}

// 不需要独立维护 类型和变量，实现了变更了，类型也会自动改变,不需要每次再定义 接口或者类型的描述

const initialState = {count:0}
// 类型保护 这里是个值，并不是类型，因此 要使用类型保护 typeof
type State1 = Readonly<typeof initialState>

// // 默认的属性
const initProps ={initCount:2};
type DefaultProps1 = Readonly<typeof initProps>

class MyComponent2 extends React.Component<DefaultProps1,State1>{
  static defaultProps ={
    initCount:1
  }
  // state:State1 = initialState;
  state:State1 = {
    count:this.props.initCount
  };

  private add =() => {
    this.setState({count:3})
  }
  render () {
    return (
      <>
        {this.state.count}
      </>
    )
  }
}




// 3. 高阶组件   React.ComponentType<Props>  React.FC | React.Component
// 有参数的高阶组件
const HOC = () => () => {}



// 无参数的高阶组件   这种高阶组件，只能在无状态组件中使用
interface WithLoadingProps {
  loading?:boolean
  // add?:() => number,
  renderItem?:() => React.ReactElement
}
const withNoParams = <P extends WithLoadingProps>(WappCom:React.ComponentType<P>) => {
  return class WithLoading extends React.Component<P & WithLoadingProps,any> {
    static defaultProps = {
      loading:false
    }
    // change =() => {}
    render() {
      const {loading,...nextProps} = this.props
      console.log('cccccccccc',this.props)
      return loading ?<> 加载中......</>:<WappCom {...this.props}  /> // 剩下的参数 ，并不知道是什么类型，因此要断言
    }
  }
}

// as 在导入导出的时候，称之为重命名 用在变量前要断言


// 4. 获取一个组件的type  React.ComponentProps

// type MyComponentProps = React.ComponentType< typeof MyComponent1>

// class MyComponent2 extends React.Component <MyComponentProps> {
//   state:State ={
//     age:12
//   }
//   render () {
//     return (
//       <>
//         {this.props.name}
//         {this.state.age}
//       </>
//     )
//   }
// }

// 5. 一个元素或者自定义的组件  React.ReactElement

const elementOnly:React.ReactElement = <div> sfsd</div> || <MyComponent name='sf' />

// 6. 一个节点 Ract.ReactNode 基本包含所有的类型 包含  React.ReactElement 和 Ract.Fragments

const children:React.ReactNode = null || "s" || 0 || false || undefined || <div/> || <MyComponent name="dd"></MyComponent>

// 7. css检验  React.CSSProperties

const cssStyle:React.CSSProperties = { color:'red'  };

const element = <div style={cssStyle} />

// 8. 接受的属性必须是 这个元素 必须有的元素 React.HTMLProps<HTMLXXXElement>  也可以自定义 属性去加入。待例子验证

const Input111:React.FC<React.HTMLProps<HTMLInputElement>> = (props) => (<input {...props} />)

// 9. 事件的参数检验
interface ISPropsEvent {
  onClick:(e:React.MouseEvent<HTMLDivElement>)=> void
}
//  通用
const handleInputChange:React.ReactEventHandler<HTMLInputElement> =(e) => {}
// 检验函数是什么类型的，这个类型接受泛函参数约束
const DivMouseEvent:React.FC<ISPropsEvent> = ({onClick,children}) => (<div onClick={onClick}>{children}</div>)



// 特定的事件


// 组件复用：将子元素变成一个渲染回调 又称为之为 子组件函数

// 泛函接口 使用 这个接口，必须满足 这两个属性 ，同时，泛函接口接受的参数是 T类型  ，在泛函成员里面大家都知道这个参数的类型了。
interface GenericListProps<T> {
  items:T [],
  renderItem:(item:T) => React.ReactElement
}

// 泛函类 在类名后面使用<> 表示要检验参数的类型
class GenContainer<T> extends React.Component<GenericListProps<T>> {
  render() {
    const { items,renderItem } = this.props;
    return (
        <>
          {items.map(renderItem)}
        </>
    )
  }
}

// ref 的使用检验 ，表单上使用的话 React.createRef<HTMLDIvElement>()

class RefComponent extends React.Component {
  private refChange =() => {
    console.log('获取到子组件的方法')
  }
  redner() {
    return (
      <>
         测试自定义组件ref的使用
      </>
    )
  }
}


// 回调函数

interface CallBack {
  on:(type:string,change:Function) => void
}
const callBack:(change:Function)=>void = ()=> {}

callBack(()=>{console.log('dddd')})

// 括号间隔  高阶with  事件on_ 手动事件 handle
// 字符串转成 数字+   转成boolean 用！！
// js 中  false null undefined 0 "" NaN 是为false, 其他为真
// 常用的属性就行缓存，也就是解构
// 跳转要进行转义 encodeURIComponent


/****************************************************** */

interface IsState {
  count:number
}
interface Loading {
  dd:boolean
}

/**------------------------------------------------------ */
// 1. 无状态组件的检验
type FCProps = {
  onClick:(e:React.MouseEvent<HTMLElement>)=> void,
  children:React.ReactNode
}

// 问题1: 所具有的这个组件，所有的参数必须传递，否则报错。因此可以将类型的验证改成非必填。

// const FCComponent1:React.FC<Partial<FCProps>> = ({onClick:handleClick,children}) => (<div onClick={handleClick}>{children}</div>)

// 方式1  keyof 便利属性
// const FCComponent1:React.FC<{[P in keyof FCProps]?:FCProps[P] }> = ({onClick:handleClick,children}) => (<div onClick={handleClick}>{children}</div>)

// 方式2 Partial<U>  接受一个参数，将所有的参数变成可选的参数
// const FCComponent1:React.FC<Partial<FCProps>> = ({onClick:handleClick,children}) => (<div onClick={handleClick}>{children}</div>)

// 方式3 将传入的参数默认都是可选的类型
const FCComponent1:React.FC<{ [ x: string ]: any }> = ({ onClick: handleClick, children }) => (<div onClick={ handleClick }> { children } </div>)

// 2. 有状态组件
// 设计state 应该只读,不涉及页面UI更新设计成全局变量去更新 只有在需要根据传入的props计算state的值时，才需要constructor,否则应该直接约束
// 一般情况下，先定义类型，再去赋值使用，但是 typeof 类型保护，可以将这个顺序颠倒，这样不必每次都修改定义的类型，只要值值改变就会触发类型推断

interface IsStateInter {
  count:number
}

class StateComponent extends React.Component< {}, IsStateInter > {
  readonly state:IsStateInter ={
    count:1
  }
  render() {
    return (
      <>
      </>
    )
  }
}

// 定义和初始值
const stateCount ={
  count:1
}
// 两种书写方式 ，默认会加上 Readonly，不写也行
type IsStateInter2 = typeof stateCount;
type IsStateInter3 = Readonly<typeof stateCount>

class StateComponent2 extends React.Component<{},IsStateInter2> {
  readonly state:IsStateInter2 =stateCount;
  render() {
    return (
      <>
      </>
    )
  }
}

//3. render 回调渲染模式
type ItemType = number | string | any []
interface RenderProps {
  item:ItemType;
  renderItem:(value:ItemType) => React.ReactElement
}

class RenderBackComponent extends React.Component<RenderProps> {
  render() {
    const {item,renderItem} = this.props;
    return (
      <>
      {renderItem(item)}
      </>
    )
  }
}

// 解决问题，自定义数据和渲染数据； 但是存在问题 ：1.类型定义使用，没有问题，但是在使用时，需要去断言类型，或者在内部去断言。这种方式不太好；
// 泛型类和泛型接口和类型保护结合

interface ReanderProps2<T> {
  item: T [] | T;
  renderItem:(arg:T) => React.ReactNode
}

class RenderBackComponent2<P> extends React.Component<ReanderProps2<P>> {
  render () {
    const {item,renderItem} = this.props;
    console.log(item instanceof Array )
    return (
      <>
        {
          //  react 中函数会自动渲染
           item instanceof Array ? item.map(renderItem) :renderItem(item)
        }
      </>
    )
  }
}

// 以上是通过返回函数渲染的方式，通过直接渲染组件的方式

// 4. 组件注入  一个约束接受一个组件，这个组件将满足一些约束
interface InsetComProps {
  // component: RenderBackComponent2<any>
  component:React.ReactNode
}

class InsetCom extends React.Component<InsetComProps> {
  render() {
    const {component} = this.props;
    return (
      <>
      {component}
      </>
    )
  }
}

//5. 高阶组件
// 不传参数的情况下，这种只能 使用在 无状态的组件中. 存在的问题 ，@ 修饰的是类

interface WarpComProps {
  name?:string
}
const withAddName = <P extends WarpComProps>(WarpCom:React.ComponentType<P>) => class MyHoc extends React.Component<P,any> {
  static defaultProps = {
    name:'反反复复'
  }
 redner() {
   const {name} = this.props
   return (
     <>
     <WarpCom {...this.props} name={name} />
     </>
   )
 }
}

interface HocProps {
  // Contains the prop my HOC needs
  thingy: number;
}

const hoc = function<P extends HocProps>(
  WrappedComponent: new () => React.Component<P, any>
) {
  return class MyHOC extends React.Component<P, any> {
    change =() => {}
      render() {
          return (
              <WrappedComponent {...this.props}/>
          );
      }
  }
}

// const withNoParams = <P extends WithLoadingProps>(WappCom:React.ComponentType<P>) => {
//   return class WithLoading extends React.Component<P & WithLoadingProps,any> {
//     static defaultProps = {
//       loading:false
//     }
//     render() {
//       const {loading,...nextProps} = this.props
//       console.log('cccccccccc',this.props)
//       return loading ?<> 加载中......</>:<WappCom {...this.props} add={()=>12} renderItem={()=><div>dsada</div>} /> // 剩下的参数 ，并不知道是什么类型，因此要断言
//     }
//   }
// }





// @connect()
// @logClass
// @classConnect('w',12)
// @classConnect('www',12)
// 高阶组件 props 和state 要完全对应
// @withNoParams
// @withAddName
 class Home extends React.Component{
   // 静态变量
  // static defaultProps ={
  //   loading:false
  // }
  // 只读
  // ref:any;
  readonly state:IsState={
    count:1
  }
  // 自定义组件使用ref
  private ref = React.createRef< InsetCom >() ;
  // private inputRef = React.createRef<HTMLInputElement>()
  change =() => {
    // this.setState({count:3})
  }
  add =() => {}
  render() {
    console.log('dsd',this.state.count)
    // const {getFieldDecorator} = this.props.form;
    // console.log('cccccccc',this.props.add())
    return (
      <div >
        {/* <FCComponent1 onClick ={()=> {console.log('111111')}} ><div>测试无状态组件的检验</div></FCComponent1>
        <FCComponent1 ><div>测试无状态组件的检验</div></FCComponent1>
        <RenderBackComponent item='1' renderItem={(value)=>(<>测试数据是什么:{value}</>)} />
        <RenderBackComponent item={1} renderItem={(value)=>(<>测试数据是什么:{value}</>)} />
        <RenderBackComponent
          item={[{name:111,age:'12'}]}
          renderItem={
            (value)=>(<>
              测试数据是什么:
              {(value as Array<{name:number,age:string}>).map((i) => (<span>{i.name + i.age}</span>))}
            </>)
            }
         /> */}
         {/* <RenderBackComponent2 item={[{name:'11111111'}]} renderItem={(vlaue)=>(<div key={vlaue.name}>测试数据{vlaue.name}</div>)} />
         <RenderBackComponent2 item='ddd' renderItem={(vlaue)=>(<div>测试数据{vlaue}</div>)} />
         <RenderBackComponent2 item={222222222} renderItem={(vlaue)=>(<div>测试数据{vlaue}</div>)} /> */}
         <InsetCom ref={this.ref} component={ <RenderBackComponent2 item='ddd' renderItem={(vlaue)=>(<div>测试数据{vlaue}</div>)} />} />
        {/* <MyComponent2 /> */}
        {/* <DivMouseEvent onClick={()=>{console.log('11111')}}/> */}
        {/* <RefComponent ref={this.ref} /> */}
        {/* <input ref={this.inputRef} /> */}
        {/* {this.props.renderItem()} */}
        {/* {this.props.loading?'':'sf'} */}
          {/* <GenContainer items={[{name:"ssss",id:1}]} renderItem ={(item) => (<div key={item.id} >{item.name}</div>)} />
          <GenContainer items={[1,2,3]} renderItem ={(item) => (<div key={item} >{item}</div>)} /> */}
      </div>
    )
  }
}

export default Form.create()(withNoParams(Home))
