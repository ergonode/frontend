/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import SideBar from '~/core/components/SideBar/SideBar';

const localVue = createLocalVue();
const router = new VueRouter();
const mocks = {
    $hasAccess: jest.fn(),
    $route: {
        path: '/products',
        params: { placeholder: '2' },
    },
    $modulesConfiguration: {
        menu: [],
    },
};
describe('SideBar', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(SideBar, {
            localVue,
            router,
            mocks,
            stubs: ['NuxtLink'],
        });
    });

    it('Component is named well', () => {
        expect(typeof SideBar.name).toBe('string');
        expect(SideBar.name).toEqual('SideBar');
    });

    it('Togglering menu state classes', () => {
        expect(wrapper.vm.value).toBe(2);
        expect(wrapper.vm.menuStateClass).toBe('menu--full');

        wrapper.vm.$nextTick(() => {
            expect(SideBar.computed.menuStateClass.call({ value: 0 })).toBe('menu--hidden');
        });

        wrapper.vm.$nextTick(() => {
            expect(SideBar.computed.menuStateClass.call({ value: 1 })).toBe('menu--icons');
        });
    });
});
