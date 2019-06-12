/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from 'vue-router';
import HorizontalTabBar from '~/components/Tab/HorizontalTabBar';

const localVue = createLocalVue();
const router = new VueRouter();
const mocks = {
  $route: {
    name: '',
  }
};
describe('Tab/HorizontalTabBar', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(HorizontalTabBar, {
        localVue,
        router,
        mocks,
        propsData: {
          items: [
            {
                title: 'Tree design',
                path: '/category-trees/tree',
                active: true,
                props: {
                    updateButton: {
                        title: 'SAVE CHANGES',
                        action: null,
                    },
                },
            },
          ],
        },
        stubs: ['NuxtChild', 'NuxtLink'],
      });
    });
    it("Component rendered correctly", () => {
      expect(wrapper.is(HorizontalTabBar)).toBe(true);
    });

    it('Check if component is named correctly', () => {
      expect(typeof HorizontalTabBar.name).toBe('string');
      expect(HorizontalTabBar.name).toEqual('HorizontalTabBar');
    });
});
