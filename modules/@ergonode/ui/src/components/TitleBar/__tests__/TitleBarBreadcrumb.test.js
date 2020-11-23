/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import TitleBarBreadcrumb from '@UI/components/TitleBar/TitleBarBreadcrumb';
import {
    createLocalVue,
    shallowMount,
} from '@vue/test-utils';

const localVue = createLocalVue();

describe('TitleBar/TitleBarBreadcrumb', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(TitleBarBreadcrumb, {
            localVue,
            propsData: {
                breadcrumb: {
                    title: 'Categories',
                    icon: 'Category',
                    path: '/categories',
                },

            },
            stubs: {
                NuxtLink: true,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof TitleBarBreadcrumb.name).toBe('string');
        expect(TitleBarBreadcrumb.name).toEqual('TitleBarBreadcrumb');
    });

    it('Renders breadcrumb with category', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
