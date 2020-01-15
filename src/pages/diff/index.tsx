import React from 'react';
import {createElement,render,renderDom} from './diffDom';

export default class Diff extends React.PureComponent {
  constructor(props) {
    super(props)

    // 这里就创建了虚拟的dom的实例，是一个类
    let virtualDom = createElement('ul',{class:'list'},[
      createElement('li',{class:'item'},['住']),
      createElement('li',{class:'item'},['住']),
      createElement('li',{class:'item'},['住'])
    ])

    console.log('虚拟的dom ',virtualDom)
    let el = render(virtualDom)
    console.log('ddds',el)

  }
  render(){
    return (
      <>
      我是diff 页面
      </>
    )
  }
}
