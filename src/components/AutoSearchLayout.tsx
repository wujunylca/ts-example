
import * as React from 'react';
import { Form, Col, Row } from 'antd';
const FormItem = Form.Item;

import FormInterface from '../commonInterface/formInterface';


interface IsProps extends FormInterface {
  configContent:object []
}
interface RenderItem {
  span:number,
  render?:Function,
  name:string,
  rules?:object [],
  initialValue?:any,
  isShow?:boolean,
  label?:string,
  formLayout?:object,
  component?:React.ReactNode
}

export default class AutoFormSearchLayout extends React.Component<IsProps> {
  handleRender =(item:RenderItem) => {
      const {getFieldDecorator} = this.props.form;
      try {
         if(item.render && typeof item.render === 'function') {
             return (item.render)();
         } else {
          //    console.log('222222',item)
              return  getFieldDecorator(item.name, {
                          rules: item.rules,
                          initialValue:item.initialValue
                      })(
                          item.component
                      )
         }
      } catch (error) {
        return new Error('render is must be function or component must be presence')
      }
  }
  render() {
      const { configContent } = this.props;
      const arr = configContent.map((item, index) => ({
          name:`id${index}`,
          span:6,
          label:'',
          isShow:true,
          formLayout:{},
          rules:[{ required: false, message: '' }],
          ...item
          }));
      return (
      <Form >
          <Row gutter={24} justify='start' >
              {
                  Array.isArray(arr) &&arr.length>=1 ?
                      arr.map((item) => (
                         item.isShow? <Col
                              key={item.name}
                              span={item.span}
                              style={{textAlign:"left"}}
                          >
                              <FormItem label={item.label} {...item.formLayout}>
                                  {
                                      this.handleRender(item)
                                  }
                              </FormItem>
                          </Col>:""
                      )
                      )
                      :''
              }
          </Row>
      </Form>
      );
  }
}
