/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';

import CategoryPage from '../CategoryPage';

const mocks = {
    $hasAccess: jest.fn(),
    $isReadOnly: jest.fn(),
    $isLoading: jest.fn(),
    $route: {
        params: {
            id: '12345',
            name: 'categories',
        },
    },
    $router: {
        options: {
            routes: 'categories',
        },
    },
};
describe('Pages/CategoryPage', () => {
    beforeEach(() => {
        shallowMount(CategoryPage, {
            mocks,
            propsData: {
                title: '',
            },
            stubs: {
                NuxtLink: true,
                Button: true,
                HorizontalRoutingTabBar: true,
            },
        });
    });

    it('Check if component is named correctly', () => {
        expect(typeof CategoryPage.name).toBe('string');
        expect(CategoryPage.name).toEqual('CategoryPage');
    });
});
