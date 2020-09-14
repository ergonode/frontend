/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    createLocalVue,
    shallowMount,
} from '@vue/test-utils';
import {
    Store,
} from 'vuex-mock-store';

import ProductCompleteness from '../ProductCompleteness.vue';

const localVue = createLocalVue();
const store = new Store({
    state: {
        product: {
            completeness: {
                filled: 1,
                required: 1,
            },
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
                completeness: {
                    filled: 1,
                    required: 1,
                    missing: [],
                },
            },
            computed: {
                color() {
                    return '';
                },
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof ProductCompleteness.name).toBe('string');
        expect(ProductCompleteness.name).toEqual('ProductCompleteness');
    });

    it('Check caption', () => {
        expect(wrapper.vm.title).toBe('100% Completed');
    });

    it('Check progress', () => {
        expect(wrapper.vm.progress).toBe(100);
    });
});
