import { shallowMount, createLocalVue } from '@vue/test-utils';
import ListLayout from '@/components/listLayout.vue';
import ElementUI from 'element-ui';

// 创建临时Vue实例，挂载组件中使用的插件
const localVue = createLocalVue();
localVue.use(ElementUI);

describe('ListLayout', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ListLayout, {
      localVue,
      props: {
        url: 'url',
        filterData: {
          default: () => {
            return {
              PageIndex: 1,
              PageSize: 10,
            };
          }
        }
      }
    })
  })
  afterEach(() => {
    wrapper.destroy();
  });

  it('props_url', () => {
    // console.log(wrapper.props())
    wrapper.setProps({ url: 'url' })
    expect(wrapper.props().url).toMatch('url')
  })
  it('props_filterData', () => {
    console.log(wrapper.vm.$options.props.filterData)
    expect(wrapper.vm.$options.props.filterData.default()).toEqual({
      PageIndex: 2,
      PageSize: 10,
    })
  })
})