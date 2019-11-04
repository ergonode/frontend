/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';
import CategoryTreePage from '~/components/Pages/CategoryTreePage';

const localVue = createLocalVue();
const store = new Store({
    state: {
        draggable: {
            isListElementDragging: false,
        },
    },
});
const mocks = {
    $hasAccess: jest.fn(),
    $store: store,
};
afterEach(() => store.reset());
describe('Pages/CategoryTreePage', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(CategoryTreePage, {
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
        expect(typeof CategoryTreePage.name).toBe('string');
        expect(CategoryTreePage.name).toEqual('CategoryTreePage');
    });

    it('Check if blur is visible', () => {
        expect(wrapper.vm.isBlurVisible).toBeFalsy();
        wrapper.vm.$nextTick(() => {
            store.state.draggable.isListElementDragging = true;
            expect(wrapper.vm.isBlurVisible).toBeTruthy();
        });
    });

    it('Check if z-index is set up', () => {
        expect(wrapper.vm.blurZIndex).toBeNull();
        wrapper.vm.$nextTick(() => {
            store.state.draggable.isListElementDragging = true;
            expect(wrapper.vm.blurZIndex).toEqual({ zIndex: '10' });
        });
    });
});
