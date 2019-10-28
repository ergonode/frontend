/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import NavigationBarButton from '~/components/Navigation/NavigationBar/NavigationBarButton';

describe('Navigation/NavigationBar/NavigationBarButton', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(NavigationBarButton, {
            propsData: {
                isSelected: true,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof NavigationBarButton.name).toBe('string');
        expect(NavigationBarButton.name).toEqual('NavigationBarButton');
    });

    it('Check if button is selected', () => {
        expect(wrapper.vm.isSelected).toBeTruthy();
        expect(wrapper.vm.$el.classList.contains('bar-button--selected')).toBeTruthy();
    });
});
