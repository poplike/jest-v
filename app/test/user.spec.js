/**
 * Home.vue组件
 * 测试内容包括以下
 * 挂载子组件-stubs
 * 临时vue实例上挂载vue-router
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import User from '@/views/user.vue';
// import VueRouter from 'vue-router';
// import eventHub from '@/assets/js/EventHub.js';

// 创建临时Vue实例，挂载组件中使用的插件
const localVue = createLocalVue();
// localVue.use(VueRouter);

describe('user', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(User);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  // console.log(wrapper);
  it('message', () => {
    // wrapper.setData({ message: 123 });
    expect(wrapper.vm.message).toBe('name');
  });

  it('click', () => {
    let btn = wrapper.find('.btn');
    btn.trigger('click');
    expect(wrapper.vm.message).toBe(1);
  });

  // it('图片显示时snapshot测试', () => {
  //   expect(wrapper.vm.$el).toMatchSnapshot();
  // });
  // it('图片显示时snapshot测试123', () => {
  //   expect(wrapper.vm).toMatchSnapshot();
  // });
});

// describe('Home.vue', () => {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = shallowMount(Home, { localVue, stubs: ['app-header', 'app-sidebar'] });
//   });

//   afterEach(() => {
//     wrapper.destroy();
//   });

//   // 测试内容：eventHub $on
//   it('eventHub $on test', () => {
//     wrapper.vm.collapse = false;
//     // 顺手测试一下DOM结构中类名的存在与否
//     expect(wrapper.find('.content').classes()).not.toContain('content--collapse');
//     eventHub.$emit('collapse', true);
//     expect(wrapper.vm.collapse).toBeTruthy();
//     // 顺手测试一下DOM结构中类名的存在与否
//     expect(wrapper.find('.content').classes()).toContain('content--collapse');
//   });

//   // 测试内容：snapshot->概括的测试DOM结构
//   // 如果组件内存在比较特殊的需要测试的DOM结构的话，可以单独测试（详见AppButton测试文件末尾）
//   it('snapshot test', () => {
//     expect(wrapper.html()).toMatchSnapshot();
//   });
// });