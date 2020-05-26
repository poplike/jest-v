import "./axios.config";
import axios from "axios";
import Cookies from "js-cookie";
import { Message } from "element-ui";
import permissionFilter from '@/utils/permissionFilter'
function api(serviceName, url, data, isErrMesg = false) {
  initRequestData(data);
  data = permissionFilter.checkAndSetBrandIds(url, data)
  let host = process.env.baseURL;
  let action = url.replace(/([a-zA-Z])\//, "$1.");
  let apiURL = host + "/Api/" + serviceName + action;
  url = host + url;

  return axios({
    method: "post",
    url: apiURL,
    headers: {
      Operator: api.Id
    },
    data: data
  })
    .then(response => {
      if (!response.IsSuccess) {
        // 请求返回 IsSuccess为false
        return Promise.reject(response);
      } else {
        return response;
      }
    })
    .catch(res => {
      !isErrMesg && showErrMessage(res);
      return Promise.reject(res);
    });
}

function showErrMessage(response) {
  Message({
    type: "error",
    message: response.Message || "操作未成功"
  });
}

// 保存token的cookie key
api.tokenKey = "e_token_pack";
// 保存用户信息的cookie key
api.userKey = "e_uio";

// 获取用户信息
api.getUserInfo = () => {
  try {
    let info = JSON.parse(Cookies.get(api.userKey));
    api.Id = info.Id;
    return info;
  } catch (error) {
    console.log(error)
    return null
  }
};

function initRequestData(data) {
  let userStr = Cookies.get(api.userKey);
  let userId = 0;
  if (userStr) {
    let userInfo = JSON.parse(userStr);
    userId = userInfo.Id;
  }
  let reqHeader = {
    Channel: "ERP",
    Operator: userId
  };
  data.Header = reqHeader;
}

export default api;
