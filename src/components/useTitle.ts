import {useState, useEffect} from 'react';

const data = [
  {id:1001,isOnline:true},
  {id:1002,isOnline:true},
  {id:1003,isOnline:true},
  {id:1004,isOnline:false}
]

export default function useTitle(id:number) {
  const [isChange,onChange] = useState(false)
  useEffect ( ()=> {
    console.log('dddddddd')
   const filterData =  data.filter(item => Object.is(item.id,id));
    if(filterData.length>=1) {
      const {isOnline} = filterData[0];
      onChange(isOnline)
    }
  })
  console.log('useTitle inner')
  return isChange;
}
