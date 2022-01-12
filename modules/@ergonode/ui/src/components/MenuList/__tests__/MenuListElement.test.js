/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import MenuListElement from '@UI/components/MenuList/MenuListElement';
import {
    createLocalVue,
    shallowMount,
} from '@vue/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueRouter from 'vue-router';

const localVue = createLocalVue();
const router = new VueRouter();
const mocks = {
    $route: {
        path: '/products',
    },
};

describe('Navigation/MenuListElement', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(MenuListElement, {
            localVue,
            router,
            mocks,
            propsData: {
                item: {
                    title: 'Products catalog',
                    routing: '/products',
                    icon: 'Document',
                },
            },
            data() {
                return {
                    isHover: false,
                };
            },
            stubs: {
                NuxtLink: true,
                Document: true,
            },
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('Component is named well', () => {
        expect(typeof MenuListElement.name).toBe('string');
        expect(MenuListElement.name).toEqual('MenuListElement');
    });

    describe('mouseenter event', () => {
        beforeEach(async () => {
            await wrapper.trigger('mouseenter');
        });

        it('Element is selected', () => {
            expect(wrapper.vm.isSelected).toBeTruthy();
            expect(wrapper.vm.isHover).toBeFalsy();
        });
    });

    describe('mouseleave event', () => {
        beforeEach(async () => {
            await wrapper.trigger('mouseleave');
        });

        it('Element is selected', () => {
            expect(wrapper.vm.isSelected).toBeTruthy();
            expect(wrapper.vm.isHover).toBeFalsy();
        });
    });
});
