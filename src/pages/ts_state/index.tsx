import React,{PureComponent} from 'react';

// state 状态应该只读; 不会引起界面UI发生变化的，不要设计成state  设计state

// 方式1 ，定义接口
// interface IState {
//   name:string;
//   // age:number;
// }


// 方式2 : 通过 type typeof 方式  类型保护，只需要修改定义的变量就好 ,此时变成都是可选的变量

const defaultState = {
  name:'我是组件内置的状态名字',
  age:12
}

// 可以通过定义通用的约束 ,不推荐，应该强检验，这样报错信息会比较友好

// interface  IState {
//   [propsName:string]:any
// }

type IState = typeof defaultState;

// 方式3: 通过props 去 计算state的值，要去实现constructor 方法

export default class Example extends PureComponent<{},IState> {
  private static readonly  defalutProps ={

  }
  // 方式1:
  // readonly state:IState ={
  //   name:'我是组件内置的状态名字',
  //   age:12
  // }

  // 方式2:
  // readonly state:IState = defaultState;
  constructor(props:object) {
    super(props);
    this.state ={
      name:'sdf',
      age:12
    }
  }
  render () {
    const {name} = this.state;
    return (
      <>
      {name}
      </>
    )
  }
}
