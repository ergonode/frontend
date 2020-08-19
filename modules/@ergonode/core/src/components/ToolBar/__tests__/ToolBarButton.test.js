/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import ToolBarButton from '@Core/components/ToolBar/ToolBarButton';
import {
    shallowMount,
} from '@vue/test-utils';

describe('ToolBar/ToolBarButton', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(ToolBarButton, {
            propsData: {
                isSelected: true,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof ToolBarButton.name).toBe('string');
        expect(ToolBarButton.name).toEqual('ToolBarButton');
    });

    it('Check if button is selected', () => {
        expect(wrapper.vm.isSelected).toBeTruthy();
        expect(wrapper.vm.$el.classList.contains('tool-bar-button--selected')).toBeTruthy();
    });
});
