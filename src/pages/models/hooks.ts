// import login from '../services/login';
import router from 'umi/router';


export default {
  namespace:'hooks',
  state:{
    count:0
  },
  effects:{
    // *login({payload},{put,call,select}){
    //    const data = yield call(payload)
    //    console.log('444444',data)
    //    if(data.data.user) {
    //      localStorage.setItem('token',data.data.token);
    //      router.replace('/');
    //    }
    // }
  },
  reducers:{
      add:({count}:{count:number}) => {
        return {count:count +1};
      }
  }
}
