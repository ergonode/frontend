/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount, createLocalVue } from '@vue/test-utils';
import AttributePage from '~/components/Pages/AttributePage';

const localVue = createLocalVue();

const mocks = {
    $hasAccess: jest.fn(),
};
describe('Pages/AttributePage', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(AttributePage, {
            localVue,
            mocks,
            propsData: {
                title: '',
            },
            stubs: {
                HorizontalTabBar: true,
            },
        });
    });
    it('Component rendered correctly', () => {
        expect(wrapper.is(AttributePage)).toBe(true);
    });

    it('Check if component is named correctly', () => {
        expect(typeof AttributePage.name).toBe('string');
        expect(AttributePage.name).toEqual('AttributePage');
    });
});
