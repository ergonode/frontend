/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import UserPage from '~/components/Pages/UserPage';

const mocks = {
    $hasAccess: jest.fn(),
    $isReadOnly: jest.fn(),
    $isLoaded: jest.fn(),
    $route: {
        params: {
            id: '12345',
            name: 'users',
        },
    },
    $router: {
        options: {
            routes: 'users',
        },
    },
};

describe('Pages/UserPage', () => {
    beforeEach(() => {
        shallowMount(UserPage, {
            mocks,
            propsData: {
                title: '',
            },
            stubs: {
                NuxtLink: true,
                NuxtChild: true,
            },
        });
    });

    it('Check if component is named correctly', () => {
        expect(typeof UserPage.name).toBe('string');
        expect(UserPage.name).toEqual('UserPage');
    });
});
