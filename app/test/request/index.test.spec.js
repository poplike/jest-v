import axios from 'axios';
jest.mock('axios');

it('测试', () => {
  axios.get.mockResolvedValue(1);
  axios.get().then((res) => {
    expect(res).toBe(1);
  });
});
