// import axios from 'axios'
// import router from '@/router'
// import { Message } from 'element-ui'
// import LocalStoreManager from '@/utils/localStoreManager'
// import $userManager from '@/utils/userManager'

// axios.defaults.baseURL = process.env.baseURL
// axios.defaults.timeout = 10000

// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   let token = $userManager.getTokenPack().AccessToken || null
//   config.headers.token = token
//   return config
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error)
// })

// axios.interceptors.response.use(function (response) {
//   // token验证失败
//   if (response.data.ErrorCode === '0003') {
//     return $userManager.handleError0003(response)
//   }
//   if (response.data.ErrorCode === '0004' || response.data.ErrorCode === '40000' || response.data.ErrorCode === '40001') {
//     authError()
//     return Promise.reject()
//   } else {
//     return response.data
//   }
// }, function (error) {
//   defaultErrorCB(error)
//   return Promise.reject(error)
// })

// // 请求错误
// function defaultErrorCB(res) {
//   Message({
//     type: 'error',
//     message: res.Message
//   })
// }

// // 身份验证错误
// function authError() {
//   Message({
//     type: 'info',
//     message: '认证失败，3秒后自动跳转到登录页面',
//     duration: 3000
//   })
//   LocalStoreManager.clear()
//   setTimeout(() => {
//     router.push({ path: '/logon' })
//   }, 3000)
// }
