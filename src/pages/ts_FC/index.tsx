import React,{PureComponent,FC,ReactNode} from 'react';

// 规范：对象换行  props 自定义，里面的children 是自定义属性里面的children
type ExampleFCProps = {
  readonly props: Readonly< { children?: ReactNode} >;
  name:string
}

type ExampleFCProps2 = {
  name:string,
  age:12,
}

// 规范：逻辑 单独一行
// 函数式组件 检验props 是只读的属性，里面有个props 是个对象，里面有个属性  children
const ExampleFC:FC< ExampleFCProps > = ( {props,name,children} ) => (
  <>
    { props.children }
    {name}
  </>
);

// 规范:推荐使用缓存，解构   FC 组件会默认定义 children,defaultProps displayName propTypes 无需自己定义
const ExampleFC2:FC< ExampleFCProps2 > = ({ name, age, children } ) => (
  <>
    { children }
  </>
);

// 渲染的函数，不应该定义为类的属性，应该抽出去 作为 函数式组件使用

export default class FCExample extends PureComponent {

  renderItem =() => {}

  render() {
    return (
      <>
        <ExampleFC name='sdfs' props={{children:<>我是props的children</>}} >
            <>
              哈哈哈，这个一个children
            </>
          </ExampleFC>

          <ExampleFC2 age={12} name='1231' >

            <span>
                自动会检验组件的children
            </span>
          </ExampleFC2>
      </>
    )
  }
} ;
