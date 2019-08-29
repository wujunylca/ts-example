import * as React from 'react';
import Hello from '../../../src/components/Hello';
import Count from '../../../src/components/Count';
import { Button } from 'antd';

interface IsState {
  count:number
}
//  React.Component 是泛型类 , 断言属性和成员变量<>
export default class Home extends React.Component<{},IsState> {
  // constructor(props:object) {
  //   super(props);
  //   this.state ={
  //     count:0,
  //     // count:[]
  //   }
  // }
  point:number=12; // 全局变量
  state:IsState ={ // 引起视图更新的设为state
    count:0
  }
componentDidMount() {
  // useCount({count:1})
//  console.log('useTitle',useTitle(1001)) ;
}
handleCount = () => {

  this.setState({count:2})
}
  render() {
    return (
      <div>
           <Hello title='ts' />
           <Hello title='js' />
           {
            //  <Example />
           }
           {/* <Hello  />
           <Hello  title={123} /> */}
           <Count {...{count:1}} />
           <Button onClick={this.handleCount}> 点击外层</Button>
      </div>
    )
  }
}
