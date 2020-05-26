/**
 * 测试内容包括以下
 * 挂载子组件-stubs
 * 测试el-button
 */

import { mount, createLocalVue } from '@vue/test-utils';
import User from '@/views/user.vue';
import ElementUI from 'element-ui';

// 创建临时Vue实例，挂载组件中使用的插件
const localVue = createLocalVue();
localVue.use(ElementUI);

describe('user', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(User, {
      localVue
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('message', () => {
    expect(wrapper.vm.message).toBe('name');
  });

  it('handleClick', () => {
    let btn = wrapper.find('.el-button');
    btn.trigger('click');
    expect(wrapper.vm.message).toBe('new name');
  });

  it('onBtnClick', () => {
    wrapper.vm.onBtnClick()
    expect(wrapper.vm.message).toBe('new name bn1')
  });

  it('显示时snapshot测试', () => {
    // 方便查找dom
    expect(wrapper.vm.$el).toMatchSnapshot();
  });
});
