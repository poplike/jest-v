/**
 * 测试内容包括以下
 * 挂载子组件-stubs
 * 测试el-button
 */
import Vue from 'vue';

import { mount, createLocalVue, createWrapper } from '@vue/test-utils';
import User from '@/views/user.vue';
import ElementUI from 'element-ui';

// 创建临时Vue实例，挂载组件中使用的插件
const localVue = createLocalVue();
localVue.use(ElementUI);

describe('user', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(User, {
      localVue,
      stubs: {
        aab: `<div @click="onBtnClick"></div>`,
      },
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
    expect(wrapper.vm.message).toBe('new name');
    // wrapper.find('')
  });

  it('显示时snapshot测试', () => {
    // 方便查找dom
    expect(wrapper.vm.$el).toMatchSnapshot();
  });
});
