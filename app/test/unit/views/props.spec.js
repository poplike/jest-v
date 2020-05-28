// http://caibaojian.com/vue-design/art/6vue-init-start.html#%E7%94%A8%E4%BA%8E%E5%88%9D%E5%A7%8B%E5%8C%96%E7%9A%84%E6%9C%80%E7%BB%88%E9%80%89%E9%A1%B9-options

/**
 * 测试目的 校验props 默认值 传入值 类型
 */

import Props from '@/views/props';
import { mount, createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue();

describe('props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Props, {
      localVue,
      propsData: {
        message: '内容',
      },
    });
  });

  it('props_type', () => {
    let message = wrapper.vm.$options.props.message;
    expect(message.type).toBe(String);
  });
  it('props_default', () => {
    let message = wrapper.vm.$options.props.message;
    expect(message.default()).toBe('默认内容');
  });

  it('props_insert_data', () => {
    // https://vue-test-utils.vuejs.org/zh/api/wrapper/#name
    // 返回 Wrapper vm 的 props 对象

    // expect(wrapper.props().message).toEqual('内容');
    // https://cn.vuejs.org/v2/api/#vm-props

    expect(wrapper.vm.$props.message).toEqual('内容');
  });

  it('Snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
  });
});
