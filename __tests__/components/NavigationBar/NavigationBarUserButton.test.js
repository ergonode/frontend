/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';
import NavigationBarUserButton from '~/components/NavigationBar/NavigationBarUserButton';

const localVue = createLocalVue();
const store = new Store({
    state: {
        authentication: {
            user: {
                first_name: 'jan',
                last_name: 'kowalski',
                email: 'test@gmail.com',
            },
        },
    },
});
const mocks = {
    $store: store,
};
afterEach(() => store.reset());
describe('NavigationBar/NavigationBarUserButton', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(NavigationBarUserButton, {
            localVue,
            mocks,
            stubs: {
                NuxtLink: true,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof NavigationBarUserButton.name).toBe('string');
        expect(NavigationBarUserButton.name).toEqual('NavigationBarUserButton');
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

    it('Check if user initials are correct', () => {
        expect(wrapper.vm.userInitials).toBe('Jan Kowalski');
    });
});
