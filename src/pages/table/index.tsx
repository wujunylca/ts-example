import React,{FC, useCallback,useEffect} from 'react';
import {Table,Input,Form,Row,Col, Button,Select,Cascader,DatePicker} from 'antd';
import moment from 'moment';
import AutoSearchLayout from '../../../src/components/AutoSearchLayout';
import { string } from 'prop-types';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;

const cascaderData = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

// 假设从外层传递过来的数据
const searchData = [
  {
    name:'INPUT.name',
    initValue:'1',
    label:'sfdsf',
    formLayout:{labelCol: { span:5}, wrapperCol: { span:19 }},
    span:3,
    component:<Input />
    // render:
  },
  {
    name:'SELECT.select',
    initValue:'1',
    span:3,
    component:(<Select style={{ width: "100%" }} >
    <Option value="86">+86</Option>
    <Option value="87">+87</Option>
  </Select>)
    // render:
  },
  {
    name:'CASCADER.pronice,city,area',
    initValue:[],
    span:3,
    component:<Cascader options={cascaderData} placeholder="Please select" changeOnSelect />
    // render:
  },
  {
    name:'DATEPICKER.date',
    initValue:undefined,
    span:3,
    component:<DatePicker style={{width:'100%'}} />
    // render:
  },
  {
    name:'RANGEPICKER.startTime,endTime',
    initValue:undefined,
    span:5,
    component: <RangePicker />
    // render:
  },
  {
    name:'BUTTON.layout',
    initValue:'3',
    span:4,
    component: <Button type='primary' onClick={() => { console.log('触发组件的请求方法') }} >查询</Button>
    // render:
  }
]

interface RenderItem {
  span:number,
  render?:Function,
  name:string,
  rules?:object [],
  initValue?:any,
  isShow?:boolean,
  label?:string,
  formLayout?:object,
  component?:React.ReactNode
}

interface SearchObj<T> {
  items: T [];
  // form?:{
  //   getFieldDecorator:Function
  // };
  [propsName:string]:any
}
const CommonSearch:FC<SearchObj<any>> =({items,getFieldDecorator,children}) => {

  useEffect(() => {
    console.log('不想子组件重新渲染')
  },[items])
  console.log('111111',items,getFieldDecorator)

  // 存在默认值
  const defaultItems = items.map((item, index) => ({
    // name:`id${index}`,
    span:6,
    label:'',
    isShow:true, // 根据不同的权限用户，显示不同查询条件
    formLayout:{},
    rules:[{ required: false, message: '' }],
    ...item
    }));

    const handleRender =(item:RenderItem) => {
      // const {getFieldDecorator} = form;
      try {
         if(item.render && typeof item.render === 'function') {
             return (item.render)();
         } else {
              return  getFieldDecorator(item.name, {
                          rules: item.rules,
                          // normalize:(value,prevValue) => {
                          //   console.log('cccccc',value,prevValue) ;
                          //   return value +'sffds';
                          //  },
                          initialValue:item.initValue
                      })(
                          item.component
                      )
         }
      } catch (error) {
        return new Error('render is must be function or component must be presence')
      }
    }
  return (
    <Form>
      <Row gutter={24} justify='start' >
          {
              Array.isArray(defaultItems) &&defaultItems.length>=1 &&
                  defaultItems.map(item => (
                      item.isShow && <Col
                          key={item.name}
                          span={item.span}
                          style={{textAlign:'left'}}
                      >
                          <FormItem label={item.label} {...item.formLayout}>
                              {
                                handleRender(item)
                              }
                          </FormItem>
                      </Col>
                  )
                  )
          }
      </Row>
      {children}
    </Form>
  )
}


const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

interface TableProps {
  search: any [];
  tableCoumns:any [];
  [props:string]:any
}

interface ObjProps {
  [props:string]:any
}

// 将Map 转化为对象

function mapToObj(map:Map<string,string>) {
  let obj:ObjProps ={};
  for(let [k,v] of map) {
    obj[k] = v;;
  }
  return obj;
}

const TablePage:FC<TableProps> =({search,tableCoumns,form}) => {
  console.log('vvvvv',search,tableCoumns,form)

  // 处理Iput的值
   function handleInput (data:any) {
    const getValue = Object.keys(data);
     data[getValue[0]] = data[getValue[0]].trim();
     return data;
   }
   //   处理Select 的值
   function handleSelect (data:any) {
    const getValue = Object.keys(data);
    data[getValue[0]] = Number(data[getValue[0]]) ;
    return data;
   }
  //  处理级联选择器
  function handleCascader(data: string []) {
    const getKeys = Object.keys(data)[0].split(',');
    const getValue = Object.values(data)[0]
    if(getValue.length===0) {
      return {}
    } else {
      const arrChangeMap = () =>  new Map(getKeys.map((item,index) => [item,getValue[index]]));
      let getData =  mapToObj(arrChangeMap());
      return getData
    }
  }
  // 处理时间选择器
  function handleDate (data:any) {
      console.log('日期选择器',data)
      const [type] = Object.keys(data);
      if(data[type]) {
        data[type] = data[type].format('YYYY-MM-DD');
        return data;
      }
  }

  type RangePickerProps = undefined | null | any []
  // 处理阶段时间选择器
  function handleRangeDate(data:any) {
      console.log('vvvv',data)
      const getKeys = Object.keys(data)[0].split(',');
      const getValue:any = Object.values(data)[0];
      console.log('getvalue',getValue)
      if( Array.isArray(getValue) && getValue.length>=1 ) {
        return {
          [getKeys[0]]:getValue[0].format('YYYY-MM-DD'),
          [getKeys[1]]:getValue[1].format('YYYY-MM-DD')
        }
      } else {
        return {}
      }

  }


  function handleFormItem (item: any []):object {
    const type = item[0];
    const data = item[1];
    console.log('type',type,'data',data)
    let returnData;
    switch (type) {
      case 'INPUT':
          returnData = handleInput(data);
          break;
      case 'SELECT':
          returnData = handleSelect(data);
          break;
      case 'CASCADER':
          returnData = handleCascader(data);
          break;
      case 'DATEPICKER':
          returnData = handleDate(data);
          break
      case 'RANGEPICKER':
          returnData = handleRangeDate(data);
          break
      default:
        return {}

    }
    console.log('666666',returnData)
    return returnData
  }

  const getTableData = () => {
    const {validateFieldsAndScroll,getFieldsValue} =form;
    const data = Object.entries(getFieldsValue());

    let handleObj = {};
    if(data && data.length>=1 ) {
      data.forEach (item => {
        // 判断是哪种类型
          const getItemValue =  handleFormItem(item);
          handleObj ={
            ...handleObj,
            ...getItemValue
          }
      })

    }
    console.log('类型值',handleObj)

  }
  // getTableData();
  return (
    <div>
      <CommonSearch items={search} {...form} />
      <button onClick={getTableData}>点击获取表单数据</button>
      <Table dataSource={dataSource} columns={tableCoumns} />
    </div>
  )
}




const UseTable:FC =(props) => {

  return (
    <div>
      <TablePage search={searchData} tableCoumns={columns}  {...props} />
    </div>
  )
}

export default Form.create()(UseTable);
