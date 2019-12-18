/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';
import ProductCompleteness from '~/components/Progress/ProductCompleteness.vue';

const localVue = createLocalVue();
const store = new Store({
  state: {
    productsDraft: {
      completeness: {
        filled: 1,
        required: 1,
      }
    },
  },
});
const mocks = {
  $store: store,
};
afterEach(() => store.reset());
describe('Badges/ProductCompleteness', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(ProductCompleteness, {
            localVue,
            mocks,
            propsData: {
                language: 'PL',
            },
            computed: {
              color() {
                return '';
              }
            },
      });
    });

    it('Component is named well', () => {
        expect(typeof ProductCompleteness.name).toBe('string');
        expect(ProductCompleteness.name).toEqual('ProductCompleteness');
    });

    it('Check caption', () => {
        expect(wrapper.vm.caption).toBe('100% Completeness of PL');
    });

    it('Check progress', () => {
        expect(wrapper.vm.progress).toBe(100);
    });

});
