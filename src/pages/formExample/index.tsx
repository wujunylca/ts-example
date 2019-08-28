import * as React from 'react';
import AutoSearchLayout from '../../../src/components/AutoSearchLayout';
import { Form,Input,Icon,Button } from 'antd';
import FormInterface from '../../commonInterface/formInterface';
// interface IsState {
//   count:number
// }

 class Home extends React.Component<FormInterface> {
  // rootRef = React.createRef<HTMLDivElement>();
  handleChange() {

  }
  handleBlur(e:React.FormEvent<HTMLInputElement>) {

  }
  rootRef = React.createRef<HTMLDivElement>();
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
      <div ref={this.rootRef}>refs</div>
      <Form layout="inline" >
        <Form.Item >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              onBlur={this.handleBlur}
            />,
          )}
        </Form.Item>
        <Form.Item><Button onChange={this.handleChange}>查询</Button></Form.Item>
      </Form>
           <AutoSearchLayout
                    {...this.props}
                    configContent={
                        [
                            {
                                span:6,
                                name:'sdfdsf',
                                render:() => <Input />
                                // render:() => (<AutoFormGetDecortor
                                //     {...this.props.form}
                                //     {...{
                                //         name:"selectContent",
                                //         rules:[{ required: false, message: '' }],
                                //         initialValue:reserveSearchVal.selectContent,
                                //         component:<Input addonBefore={
                                //             <AutoFormGetDecortor
                                //                 {...this.props.form}
                                //                 name='selectCustomerNameType'
                                //                 rules={[{ required: false, message: '' }]}
                                //                 initialValue={reserveSearchVal.selectCustomerNameType || "agentName"}
                                //                 component={
                                //                     <FormSelect {...{ source:this.firstSelector, allowClear:false, styleObj:{ "width":"120px" } }} />
                                //                 }
                                //             />
                                //         }
                                //         />
                                //     }}
                                // />)
                            },
                            {
                                span:6,
                                name:'agentGrade',
                                label:'名字',
                                formLayout:{ labelCol:{span:6},wrapperCol:{span:18} },
                                rules:[{ required: true, message: '名字必须的' }],
                                component:<Input/>
                                // initialValue:reserveSearchVal.agentGrade,
                                // component:<FormSelect {...{ source:agentGrade ||[], allowClear:true, placeholder:'代理商等级' }} />
                            },
                        ]
                    }
                />
      </div>
    )
  }
}

export default Form.create()(Home)
