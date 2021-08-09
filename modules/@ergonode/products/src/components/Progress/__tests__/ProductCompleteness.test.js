/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    createLocalVue,
    shallowMount,
} from '@vue/test-utils';
import {
    Store,
} from 'vuex-mock-store';

import ProductCompleteness from '../ProductCompleteness';

const localVue = createLocalVue();
const store = new Store({
    state: {
        product: {
            completeness: {
                en_GB: {
                    missing: [],
                    filled: 1,
                    required: 1,
                },
            },
        },
    },
});
const mocks = {
    $t: () => {},
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
                languageCode: 'en_GB',
            },
            stubs: {
                ProgressBar: true,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof ProductCompleteness.name).toBe('string');
        expect(ProductCompleteness.name).toEqual('ProductCompleteness');
    });

    it('Check progress', () => {
        expect(wrapper.vm.progress).toBe(100);
    });
});
