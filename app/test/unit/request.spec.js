jest.mock('axios')
import { init, initRequestData, fetch } from '@/request/request.js'
import axios from 'axios'
jest.mock('@/request/request.js')

// const mockInit = jest.fn()
// const mockFetch = jest.fn().mockImplementation(()=>{

// })

describe('测试request', () => {
  let req = {
    serviceName: 'serviceName',
    url: '/url/name',
    data: { message: '请求' },
    isErrMesg: false
  }
  let apiURL = 'http://localhost/Api/serviceName/url.name'
  let req_data = {
    message: '请求',
    Header: {
      Channel: "ERP",
      Operator: 0
    }
  }
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  })

  // afterEach(() => {
  //   fetch.mockClear()
  // })

  it('api_url', () => {
    init(req)
    expect(init).toHaveReturnedWith(apiURL)
  })
  it('api_data', () => {
    initRequestData(req)
    expect(initRequestData).toHaveReturnedWith(req_data)
  })
  it('api_fetch_success', () => {

    axios.post.mockResolvedValue({ IsSuccess: true })
    fetch(req).then(res => {
      expect(axios.post).toHaveBeenCalledWith(apiURL, req_data)
      expect(res).toEqual({ "IsSuccess": true })
    })
  })
  it('api_fetch_error', () => {
    axios.post.mockRejectedValue({ IsSuccess: false })
    fetch(req).catch(err => {
      expect(err).toEqual({ IsSuccess: false })
    })
  })
})