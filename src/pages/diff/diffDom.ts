import { Children } from 'react';

// 创建一个类
class Element {
  // 接受实例化时候的参数，定义全局变量
  //type 表示标签类型， props 表示标签的属性 children 表示是否有子节点
  constructor(type,props,children) {
    this.type =type;
    this.props = props;
    this.children = children;
  }

}


function createElement(type,props,children) {
  return new Element(type,props,children)
}

function setAttr(node,key,value) {
  switch(key) {
    case 'value':
      if(node.tagName.toLowerCase()==='input' || node.tagName.toLowerCase()==='textarea') {
        node.value = value;
      }else {
        node.setAttribute(key,value)
      }
      break;
    case 'style':
      node.style.cssText = value;
      break;
      default:
        node.setAttribute(key,value);
        break;
  }
}

function render(domObj) {
  // 创建元素
  let el =document.createElement(domObj.type);

  // 遍历属性，将属性添加给元素
  for(let key in domObj.props) {
    setAttr(el,key,domObj.props[key])
  }

  domObj.children.forEach(child => {
    child = (child instanceof Element) ? render(child):document.createTextNode(child)
    el.appendChild(child)
  })
  return el;
}

function renderDom (el,target) {
  target.appendChild(el);
}

export {Element,createElement,render,setAttr,renderDom};
