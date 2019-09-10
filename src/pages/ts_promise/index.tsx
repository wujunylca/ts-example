import React,{PureComponent,FC} from 'react';
import {Button} from 'antd';
// import Example from '@/components/Count';


// 定义一个请求的方法

// 状态码标识的问题
type CodeType = 1001 | 1002 | 1003;

interface IResponse < T > {
 readonly message: string;
 readonly code: number,
 readonly data: T
}

interface ParamsProps {
  [ propsName: string ]:any
}

function getCodeFun (code: any) {
  return code;
}

// 状态码不存在的情况

function getCodeNerver(code: never): boolean {
 return true
}

// 将参数变成可选的参数
const request = (params: {[T in keyof ParamsProps]?: any }):Promise<IResponse<any>> => {
  return new Promise(( resolve, reject) => {
    setTimeout(() => {
      // code 只能是几种中的其中一种, 如果值不存在
      const getCode:CodeType = getCodeFun(1000302);
      if (getCode === 1001 ) {
        const data = {
          message: '成功',
          code: 1001,
          data: {}
        }
        // 返回的data 要满足约束
       return resolve(data)
      }
      if (getCode===1002) {
        const data = {
          message: '失败',
          code: 1001,
          data: {}
        }
        // 返回的data 要满足约束
       return reject(data)
      }
      if ( getCode === 1003) {
        const data ={
          message: 'token过期了',
          code: 1001,
          data: {}
        }
        // 返回的data 要满足约束
      return  reject(data)
      }
      if (getCodeNerver(getCode)) {
        throw new Error('UnKnow error'+getCode)
      }

    },2000)
  })
}

const requestData = async () => {
  const data =  await request({ name: 123 })
  console.log('data',data)
}
const Example:FC = () => (
<>
  <Button onClick={requestData}>点击请求</Button>
</>)

export default Example;
