/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import TitleBarBreadcrumb from '~/core/components/TitleBar/TitleBarBreadcrumb';

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
