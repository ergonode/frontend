/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueRouter from 'vue-router';
import sinon from 'sinon';
import MenuListElement from '@Core/components/MenuList/MenuListElement';

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
            stubs: ['NuxtLink'],
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('Component is named well', () => {
        expect(typeof MenuListElement.name).toBe('string');
        expect(MenuListElement.name).toEqual('MenuListElement');
    });

    describe('mouseover event', () => {
        beforeEach(() => {
            const onMouseOver = sinon.stub();
            wrapper.setMethods({ onMouseOver });
            wrapper.find('.list-element').trigger('mouseover');
            expect(onMouseOver.called).toBe(true);
        });

        it('Element is not selected', () => {
            wrapper.setProps({
                item: {
                    title: 'Categories',
                    routing: '/categories',
                    icon: 'categories',
                },
            });

            expect(wrapper.vm.isSelected).toBeFalsy();
            // FIXME: Data is not changed - WHY ? No idea..
            // expect(wrapper.vm.isHover).toBeTruthy();
        });

        it('Element is selected', () => {
            expect(wrapper.vm.isSelected).toBeTruthy();
            expect(wrapper.vm.isHover).toBeFalsy();
        });
    });

    it('mouseout event', () => {
        const onMouseOut = sinon.stub();
        wrapper.setMethods({ onMouseOut });
        wrapper.find('.list-element').trigger('mouseout');
        expect(onMouseOut.called).toBe(true);
        expect(wrapper.vm.isHover).toBeFalsy();
    });
});
