/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import AttributePage from '~/components/Pages/AttributePage';

const localVue = createLocalVue();

const mocks = {
    $hasAccess: jest.fn(),
    $isReadOnly: jest.fn(),
    $isLoaded: jest.fn(),
    $route: {
        params: {
            id: '12345',
            name: 'attributes',
        },
    },
    $router: {
        options: {
            routes: 'attributes',
        },
    },
};
describe('Pages/AttributePage', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(AttributePage, {
            localVue,
            mocks,
            propsData: {
                title: '',
            },
            stubs: {
                NuxtLink: true,
                HorizontalTabBar: true,
            },
        });
    });

    it('Check if component is named correctly', () => {
        expect(typeof AttributePage.name).toBe('string');
        expect(AttributePage.name).toEqual('AttributePage');
    });
});
