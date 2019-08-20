/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount, createLocalVue } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';
import FlashMessage from '~/components/Alerts/FlashMessage.vue';

const localVue = createLocalVue();
localVue.directive('ripple', {});

const store = new Store({
    state: {
        alerts: [],
    },
    getters: {
        'alerts/alerts': [],
    },
});
const mocks = {
    $store: store,
};
afterEach(() => store.reset());
describe('Alerts/FlashMessage', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(FlashMessage, {
            localVue,
            mocks,
            stubs: ['transition-group'],
        });
    });

    it('Component is rendered', () => {
        expect(wrapper.is(FlashMessage)).toBe(true);
    });

    it('Component is named well', () => {
        expect(typeof FlashMessage.name).toBe('string');
        expect(FlashMessage.name).toEqual('FlashMessage');
    });

    it('Check if no alerts', () => {
        const alerts = wrapper.findAll('.alert');
        expect(alerts.length).toBe(0);
    });
});
