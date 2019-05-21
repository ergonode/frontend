/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import MenuListElement from '~/components/Navigation/MenuListElement';

const localVue = createLocalVue();
describe('Navigation/MenuListElement', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(MenuListElement, {
      localVue,
      propsData: {
        title: '',
        icon: '',
        action: '',
      },
      stubs: ['nuxt-link'],
    });
  });
  afterEach(() => {
    wrapper.destroy();
  });
  it("Component renders correctly", () => {
    expect(wrapper.is(MenuListElement)).toBe(true);
  });
  it('Check if component is named correctly', () => {
    expect(typeof MenuListElement.name).toBe('string');
    expect(MenuListElement.name).toEqual('MenuListElement');
  });
  it('Check if the props are not correct', () => {
    const ListElement = wrapper.find('.list-element');
    expect(wrapper.vm.title).toBeFalsy();
    expect(wrapper.vm.icon).toBeFalsy();
    expect(wrapper.vm.action).toBeFalsy();
    expect(wrapper.vm.selectedElement).toBeFalsy();
    expect(ListElement.classes()).toContain("list-element--selected");
  });
  it('Element mouseover', () => {
    const mouseoverMethodStub = jest.fn();
    wrapper.setMethods({ mouseover: mouseoverMethodStub });
    wrapper.find('.list-element').trigger('mouseover');
    expect(mouseoverMethodStub).toBeCalled();
  });
  it('Element mouseout', () => {
    const mouseoutMethodStub = jest.fn();
    wrapper.setMethods({ mouseout: mouseoutMethodStub });
    wrapper.find('.list-element').trigger('mouseout');
    expect(mouseoutMethodStub).toBeCalled();
  });
  it('check if element is active', () => {
    wrapper.setProps({
      icon: 'paper',
      action: '/products',
      selectedElement: '/products',
    });
    expect(wrapper.vm.setIcon).toBe("menu-paper--active");
  });
  it('check if element is deactivate', () => {
    wrapper.setProps({
      icon: 'paper',
      action: '/products',
      selectedElement: '/category',
    });
    expect(wrapper.vm.setIcon).toBe("menu-paper--deactive");
  });
  it('check if element is selected', () => {
    wrapper.setData({ isHover: true });
    wrapper.setProps({
      isHover: true,
      icon: 'paper',
      action: '/products',
      selectedElement: '/category',
    });
    expect(wrapper.vm.setIcon).toBe("menu-paper--selected");
  });
});
