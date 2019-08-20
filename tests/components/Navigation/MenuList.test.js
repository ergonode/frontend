/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import MenuList from '~/components/Navigation/MenuList';

const localVue = createLocalVue();
const router = new VueRouter();
const mocks = {
    $route: {
        path: '/products',
    },
};

describe('Navigation/MenuList', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(MenuList, {
            localVue,
            router,
            mocks,
            propsData: {
                sectionMenu: [
                    {
                        title: 'Products catalog',
                        routing: '/products',
                        icon: 'Document',
                    },
                ],
            },
            stubs: ['NuxtLink'],
        });
    });

    it('Component is rendered', () => {
        expect(wrapper.is(MenuList)).toBe(true);
    });

    it('Component is named well', () => {
        expect(typeof MenuList.name).toBe('string');
        expect(MenuList.name).toEqual('MenuList');
    });
});
