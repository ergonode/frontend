/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from '@vue/test-utils';
import CategoryPage from '~/components/Pages/CategoryPage';

const mocks = {
    $canIUse: jest.fn(),
    $route: {
        params: {
            id: '12345',
        },
    },
};
describe('Pages/CategoryPage', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(CategoryPage, {
            mocks,
            propsData: {
                title: '',
            },
            stubs: {
                Button: true,
                HorizontalTabBar: true,
            },
        });
    });
    it('Component rendered correctly', () => {
        expect(wrapper.is(CategoryPage)).toBe(true);
    });

    it('Check if component is named correctly', () => {
        expect(typeof CategoryPage.name).toBe('string');
        expect(CategoryPage.name).toEqual('CategoryPage');
    });

    it('Check tab paths for new page', () => {
        expect(wrapper.vm.isEdit).toBeFalsy();
        expect(wrapper.vm.tabs[0].path).toBe('/categories/new/general');
        expect(wrapper.vm.tabs[1].path).toBe('/categories/new/translations');
    });

    it('Check tab paths for edit page', () => {
        wrapper = mount(CategoryPage, {
            mocks,
            propsData: {
                title: '',
                isEdit: true,
            },
            stubs: {
                Button: true,
                HorizontalTabBar: true,
            },
        });
        expect(wrapper.vm.isEdit).toBeTruthy();
        expect(wrapper.vm.tabs[0].path).toBe('/categories/edit/12345/general');
        expect(wrapper.vm.tabs[1].path).toBe('/categories/edit/12345/translations');
    });
});
