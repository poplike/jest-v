import Event_View from '@/views/event_view';
import { mount, createLocalVue } from '@vue/test-utils';
import { render, fireEvent } from '@testing-library/vue';

describe('event_view', () => {
  let wrapper;
  beforeEach(() => {
    jest.mock('@/views/event_view', () => {
      return {
        methods: {
          handleClick: jest.fn(),
        },
      };
    });
    wrapper = mount(Event_View);
  });

  it('on_click', () => {
    // console.log(wrapper.vm,'--------------------wrapper.vm')
    // wrapper.vm.handleClick = jest.fn();
    // wrapper.setMethods({ handleClick: stub });
    // let fn = jest.spyOn(wrapper.vm, 'handleClick');
    let log = jest.spyOn(console, 'log');
    let mockFn = jest.fn(() => {
      log('mock触发');
      return 'is_click';
    });
    wrapper.setMethods({
      handleClick: mockFn,
    });
    let btn = wrapper.find('button');
    btn.trigger('click');
    // expect(wrapper.vm.handleClick).toBeCalled();
    expect(mockFn).toBeCalled();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveReturnedWith('is_click');
  });

  it('click', () => {
    const mockOn = jest.fn((message) => {
      return message;
    });
    wrapper.vm.$on('emit_click', mockOn);
    const data = wrapper.vm.handleClick();
    expect(mockOn).toBeCalled();
    expect(mockOn).toHaveReturnedWith('emit消息')
  });
});
