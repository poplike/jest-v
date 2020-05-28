import axios from 'axios'


// export default class Request {
//   constructor(req) {
//     console.log('调用了')
//     let { serviceName, url, data, isErrMesg = false } = req
//     this.serviceName = serviceName
//     this.data = data
//     this.isErrMesg = isErrMesg
//     this.url = url
//     this.init()
//     this.initRequestData()
//   }
//   host = 'http://localhost'
//   apiURL = ''
//   Header = undefined
//   userId = 0

//   init() {
//     let action = this.url.replace(/([a-zA-Z])\//, "$1.");
//     this.apiURL = this.host + "/Api/" + this.serviceName + action;
//   }

//   fetch() {
//     return axios({
//       method: "post",
//       url: this.apiURL,
//       headers: {
//         Operator: this.userId
//       },
//       data: { ...this.data, Header: this.Header }
//     }).then(response => {
//       let { IsSuccess } = response
//       return IsSuccess ? response : Promise.reject(response)
//     }).catch(err => {
//       !this.isErrMesg && showErrMessage(res);
//       return Promise.reject(res);
//     })
//   }

//   showErrMessage(response) {
//     // 原用element 
//     // Message({ 
//     //   type: "error",
//     //   message: response.Message || "操作未成功"
//     // });

//     throw ({
//       type: "error",
//       message: response.Message || "操作未成功"
//     })
//   }

//   initRequestData(data) { // 函数命有误导  =>实际获取 header_data (itinHeaderData) 原本直接引用参数data 容易混淆 (副作用)
//     // let Header;
//     // let userStr = Cookies.get(api.userKey);
//     // let userId = 0;
//     // if (userStr) { // 获取本地Id
//     //   let userInfo = JSON.parse(userStr);
//     //   userId = userInfo.Id;
//     // }
//     this.Header = {
//       Channel: "ERP",
//       Operator: this.userId
//     };
//   }
// }

const init = jest.fn((req) => {
  let { serviceName, url } = req
  let host = 'http://localhost'
  let action = url.replace(/([a-zA-Z])\//, "$1.");
  return host + "/Api/" + serviceName + action;
})

const initRequestData = jest.fn((req) => {
  let { data } = req
  return {
    Header: {
      Channel: "ERP",
      Operator: 0
    },
    ...data
  };
})

const fetch = jest.fn((req) => {
  let { isErrMesg = false } = req
  let apiURL = init(req)
  let data = initRequestData(req)
  return axios.post(apiURL, data).then(response => {
    let { IsSuccess } = response
    return IsSuccess ? response : Promise.reject(response)
  }).catch(err => {
    isErrMesg && showErrMessage(err);
    return Promise.reject(err);
  })
})

module.exports = {
  init,
  initRequestData,
  fetch
};

