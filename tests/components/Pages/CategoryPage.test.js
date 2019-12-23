/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import CategoryPage from '~/components/Pages/CategoryPage';

const mocks = {
    $hasAccess: jest.fn(),
    $route: {
        params: {
            id: '12345',
        },
    },
};
describe('Pages/CategoryPage', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(CategoryPage, {
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

    it('Check if component is named correctly', () => {
        expect(typeof CategoryPage.name).toBe('string');
        expect(CategoryPage.name).toEqual('CategoryPage');
    });
});
