import { shallowMount, createLocalVue } from '@vue/test-utils';
// import { render, fireEvent } from '@testing-library/vue'  UI 测试库
import '@testing-library/jest-dom';
import ListLayout from '@/components/listLayout.vue';
import ElementUI from 'element-ui';

// 创建临时Vue实例，挂载组件中使用的插件
const localVue = createLocalVue();
localVue.use(ElementUI);

localVue.prototype.$utils = {
  handleDate: (data) => {
    console.log(this, '-------------this');
    let result = '';
    if (date) {
      result = new Date(+new Date(date) + 8 * 3600 * 1000).toISOString();
      result = result.replace('Z', '');
    }
    return result;
  },
};

describe('ListLayout', () => {
  let wrapper, currentTimer, initFilterData;

  beforeEach(() => {
    currentTimer = new Date();
    initFilterData = {
      timerRange: [currentTimer, currentTimer],
      startTime: currentTimer,
      endTime: currentTimer,
      PageIndex: 1,
      PageSize: 10,
    };
    wrapper = shallowMount(ListLayout, {
      localVue,
      propsData: {
        url: 'url',
        filterData: {
          timerRange: [currentTimer, currentTimer],
          PageIndex: 1,
          PageSize: 10,
        },
        hasForm: true,
        dateRanges: [
          {
            rangeName: 'timerRange',
            childName: ['startTime', 'endTime'],
          },
        ],
      },
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  // it('props_url', () => {
  //   expect(wrapper.props().url).toEqual('url');
  // });

  it('init_filterData', () => {
    expect(wrapper.vm.filterData).toEqual(initFilterData);
  });

  it('props_hasForm', async () => {
    wrapper.setProps({ hasForm: false });
    await localVue.nextTick();
    expect(wrapper.find('.form-wrap').element).toBeUndefined();
  });

  it('Snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it('doFilter_btn', () => {
    let filterBtn = wrapper.find('el-button-stub');
    console.log(filterBtn);
    filterBtn.trigger('click');
    expect(wrapper.vm.filterData).toEqual(initFilterData);
  });
});
