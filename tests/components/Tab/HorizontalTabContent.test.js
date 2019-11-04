/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import HorizontalTabContent from '~/components/Tab/HorizontalTabContent';

const localVue = createLocalVue();
const router = new VueRouter();
const mocks = {
    $route: {
        name: '',
    },
};
describe('Tab/HorizontalTabContent', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(HorizontalTabContent, {
            localVue,
            router,
            mocks,
            propsData: {
                item: {
                    title: 'Tree design',
                    path: '/category-trees/tree',
                    active: true,
                    props: {
                        updateButton: {
                            title: 'SAVE CHANGES',
                            action: null,
                        },
                    },
                },
            },
            stubs: ['NuxtChild', 'NuxtLink'],
        });
    });

    it('Check if component is named correctly', () => {
        expect(typeof HorizontalTabContent.name).toBe('string');
        expect(HorizontalTabContent.name).toEqual('HorizontalTabContent');
    });
});
