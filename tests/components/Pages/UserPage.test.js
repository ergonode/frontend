/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from '@vue/test-utils';
import UserPage from '~/components/Pages/UserPage';

const mocks = {
    $hasAccess: jest.fn(),
    $route: {
        params: {
            id: '12345',
        },
    },
};

describe('Pages/UserPage', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(UserPage, {
            mocks,
            propsData: {
                title: '',
            },
            stubs: {
                NuxtLink: true,
                Button: true,
                HorizontalTabBar: true,
            },
        });
    });
    it('Component rendered correctly', () => {
        expect(wrapper.is(UserPage)).toBe(true);
    });

    it('Check if component is named correctly', () => {
        expect(typeof UserPage.name).toBe('string');
        expect(UserPage.name).toEqual('UserPage');
    });
});
