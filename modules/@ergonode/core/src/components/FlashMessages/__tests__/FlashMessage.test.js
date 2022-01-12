/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import FlashMessages from '@Core/components/FlashMessages/FlashMessages';
import {
    createLocalVue,
    shallowMount,
} from '@vue/test-utils';
import {
    Store,
} from 'vuex-mock-store';

const localVue = createLocalVue();

const store = new Store({
    state: {
        alert: {
            alerts: [
                {
                    id: 1,
                    type: 'warning',
                    message: 'You better watch out!!!',
                },
            ],
        },
    },
});
const mocks = {
    $store: store,
};
afterEach(() => store.reset());
describe('Alerts/FlashMessages', () => {
    // eslint-disable-next-line no-unused-vars
    let wrapper;

    beforeEach(() => {
        // eslint-disable-next-line no-unused-vars
        wrapper = shallowMount(FlashMessages, {
            localVue,
            mocks,
            stubs: {
                TransitionGroup: true,
                Alert: true,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof FlashMessages.name).toBe('string');
        expect(FlashMessages.name).toEqual('FlashMessages');
    });
});
