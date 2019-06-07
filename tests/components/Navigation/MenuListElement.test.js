/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import MenuListElement from '~/components/Navigation/MenuListElement';
import VueRouter from 'vue-router'

const localVue = createLocalVue();
const router = new VueRouter();
const mocks = {
  $route: {
    path: '/products',
  }
};

describe('Navigation/MenuListElement', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(MenuListElement, {
      localVue,
      router,
      mocks,
      propsData: {
        item: {},
      },
      stubs: ['NuxtLink'],
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
  it('Element mouseover', () => {
    const mouseoverMethodStub = jest.fn();
    wrapper.setMethods({ onMouseOver: mouseoverMethodStub });
    wrapper.find('.list-element').trigger('mouseover');
    expect(mouseoverMethodStub).toBeCalled();
  });
  it('Element mouseout', () => {
    const mouseoutMethodStub = jest.fn();
    wrapper.setMethods({ onMouseOut: mouseoutMethodStub });
    wrapper.find('.list-element').trigger('mouseout');
    expect(mouseoutMethodStub).toBeCalled();
  });
});
