import React,{useLayoutEffect,useRef} from 'react';
import dva, { connect } from 'dva';
import { Button,Input } from 'antd';
import styles from './index.css'

// 同步执行一些副操作，在Dom更新完成后执行，可以获取DOM元素的宽高

 export default function HooksRef () {
    const buttonRef = useRef(null);

    useLayoutEffect(()=> {
          const {current}:{current:any}= buttonRef;
      console.log('sddddddddd',current.getBoundingClientRect())
    })
    return (
      <>
        <div className={styles.container}>
            <div ref={buttonRef} >位置</div>
        </div>
      </>
    )
 }

