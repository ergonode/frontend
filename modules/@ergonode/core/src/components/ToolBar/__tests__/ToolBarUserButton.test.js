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

import ToolBarUserButton from '../ToolBarUserButton';

const localVue = createLocalVue();
const store = new Store({
    state: {
        authentication: {
            user: {
                firstName: 'jan',
                lastName: 'kowalski',
                email: 'test@gmail.com',
            },
        },
    },
});
const mocks = {
    $store: store,
};
afterEach(() => store.reset());
describe('ToolBar/ToolBarUserButton', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(ToolBarUserButton, {
            localVue,
            mocks,
            stubs: {
                NuxtLink: true,
                ToolBarSelectButton: true,
                IconArrowDropdown: true,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof ToolBarUserButton.name).toBe('string');
        expect(ToolBarUserButton.name).toEqual('ToolBarUserButton');
    });

    it('Check if user is logged it', () => {
        expect(wrapper.find('.user')).toBeTruthy();
    });

    it('Check if user first name is capitalized', () => {
        expect(wrapper.vm.capitalizedUserFirstName).toBe('Jan');
    });

    it('Check if user last name is capitalized', () => {
        expect(wrapper.vm.capitalizedUserLastName).toBe('Kowalski');
    });
});
