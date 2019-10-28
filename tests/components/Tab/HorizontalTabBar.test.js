/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import HorizontalTabBar from '~/components/Tab/HorizontalTabBar';


const localVue = createLocalVue();
const router = new VueRouter();
const mocks = {
    $route: {
        name: '',
    },
};
describe('Tab/HorizontalTabBar', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(HorizontalTabBar, {
            localVue,
            router,
            mocks,
            propsData: {
                items: [],
            },
            stubs: {
                NuxtLink: true,
                HorizontalTabContent: true,
            },
        });
    });

    it('Check if component is named correctly', () => {
        expect(typeof HorizontalTabBar.name).toBe('string');
        expect(HorizontalTabBar.name).toEqual('HorizontalTabBar');
    });

    it('Check default scrolable classes', () => {
        expect(wrapper.vm.isLeftBoundReached).toBeTruthy();
        expect(wrapper.vm.isRightBoundReached).toBeTruthy();
        expect(wrapper.vm.scrollableStateClasses).toStrictEqual(
            {
                'tab-bar__scrollable-container--left-gradient': false,
                'tab-bar__scrollable-container--right-gradient': false,
            },
        );
    });
    it('Check scrollable classes', () => {
        wrapper.setData({
            isLeftBoundReached: false,
            isRightBoundReached: false,
        });
        expect(wrapper.vm.isLeftBoundReached).toBeFalsy();
        expect(wrapper.vm.isRightBoundReached).toBeFalsy();
        expect(wrapper.vm.scrollableStateClasses).toStrictEqual(
            {
                'tab-bar__scrollable-container--left-gradient': true,
                'tab-bar__scrollable-container--right-gradient': true,
            },
        );
    });

    it('Check if the function sets the tab index correctly ', () => {
        wrapper.vm.onSelectTabBarItem();
        expect(wrapper.vm.selectedTabIndex).toBeFalsy();
        wrapper.vm.onSelectTabBarItem(4);
        expect(wrapper.vm.selectedTabIndex).toEqual(4);
    });

    it('Check that the bounds are not reached', () => {
        const element = {
            target: {
                scrollWidth: 100,
                offsetWidth: 100,
                scrollLeft: 100,
            },
        };
        wrapper.vm.onScroll(element);
        expect(wrapper.vm.isRightBoundReached).toBeFalsy();
        expect(wrapper.vm.isLeftBoundReached).toBeFalsy();
    });

    it('Check that the bounds are reached', () => {
        const element = {
            target: {
                scrollWidth: 100,
                offsetWidth: 100,
                scrollLeft: 0,
            },
        };
        wrapper.vm.onScroll(element);
        expect(wrapper.vm.isRightBoundReached).toBeTruthy();
        expect(wrapper.vm.isLeftBoundReached).toBeTruthy();
    });
});
