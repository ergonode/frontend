/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import VueRouter from 'vue-router';
import { mount, createLocalVue } from '@vue/test-utils';
import SideBar from '~/components/Navigation/SideBar/SideBar';

const localVue = createLocalVue();
const router = new VueRouter();
const mocks = {
    $canIUse: jest.fn(),
    $route: {
        path: '/products',
        params: { placeholder: '2' },
    },
    $modulesConfiguration: {
      menu: []
    },
};
describe('Navigation/SideBar/SideBar', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(SideBar, {
            localVue,
            router,
            mocks,
            stubs: ['NuxtLink'],
        });
    });

    it('Component is rendered', () => {
        expect(wrapper.is(SideBar)).toBe(true);
    });

    it('Component is named well', () => {
        expect(typeof SideBar.name).toBe('string');
        expect(SideBar.name).toEqual('SideBar');
    });

    it('Switching menu state classes', () => {
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
