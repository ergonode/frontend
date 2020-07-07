/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    shallowMount,
} from '@vue/test-utils';

import TemplateGridShadowItem from '../TemplateGridShadowItem';

describe('TemplateGrid/TemplateGridShadowItem', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(TemplateGridShadowItem, {
            propsData: {
                lastRow: false,
                itemId: 1,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof TemplateGridShadowItem.name).toBe('string');
        expect(TemplateGridShadowItem.name).toEqual('TemplateGridShadowItem');
    });
    it('Check if not last row', () => {
        expect(wrapper.find('.shadow-grid-item--last-row')).toBeTruthy();
    });
    // FIXME
    // it('Check if last row', () => {
    //     wrapper.setProps({
    //         lastRow: true,
    //     });
    //     expect(wrapper.find('.shadow-grid-item--last-row')).toBeTruthy();
    // });
    it('Check item default id', () => {
        expect(wrapper.vm.lastRow).toBeFalsy();
        expect(wrapper.vm.itemId).toBe(1);
        expect(wrapper.find('[shadow-id="0"]')).toBeTruthy();
    });
    // FIXME
    // it('Check item id', () => {
    //     wrapper.setProps({
    //         itemId: 3,
    //     });
    //     expect(wrapper.vm.lastRow).toBeFalsy();
    //     expect(wrapper.vm.itemId).toBe(3);
    //     expect(wrapper.find('[shadow-id="2"]')).toBeTruthy();
    // });
});
