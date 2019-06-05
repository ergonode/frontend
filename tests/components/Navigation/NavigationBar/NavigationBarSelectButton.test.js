/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import NavigationBarSelectButton from '~/components/Navigation/NavigationBar/NavigationBarSelectButton';

const localVue = createLocalVue();

describe('Navigation/NavigationBar/NavigationBarSelectButton', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(NavigationBarSelectButton, {
            localVue,
            propsData: {
                title: null,
            }
        });
    });

    it("Component renders correctly", () => {
        expect(wrapper.is(NavigationBarSelectButton)).toBe(true);
    });

    it('Check if component is named correctly', () => {
        expect(typeof NavigationBarSelectButton.name).toBe('string');
        expect(NavigationBarSelectButton.name).toEqual('NavigationBarSelectButton');
    });

    it('Check selected arrow icon', () => {
        wrapper.setData({
            isSelected: true,
        });

        expect(wrapper.vm.arrowIcon).toBe('sprite-navbar navbar-arrow trans-half');
    });

    it('Check deselected arrow icon', () => {
        wrapper.setData({
            isSelected: false,
        });

        expect(wrapper.vm.arrowIcon).toBe('sprite-navbar navbar-arrow');
    });

    it('Check no title exception', () => {
        expect(wrapper.vm.title).toBeFalsy();
    });

    it('Check title value', () => {
        wrapper.setProps({
            title: 'Jan Kowalsi',
        });

        expect(wrapper.vm.title).toBe('Jan Kowalsi');
    });

    it('Check click', () => {
        const onClickStub = jest.fn();
        wrapper.setMethods({ onClick: onClickStub });
        wrapper.find('.bar-button').trigger('click');
        expect(onClickStub).toBeCalled();
    });
});
