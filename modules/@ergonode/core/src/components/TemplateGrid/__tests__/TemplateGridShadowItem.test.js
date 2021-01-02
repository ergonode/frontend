/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    shallowMount,
} from '@vue/test-utils';

import DesignerBackgroundItem from '../DesignerBackgroundItem';

describe('TemplateGrid/DesignerBackgroundItem', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(DesignerBackgroundItem, {
            propsData: {
                lastRow: false,
                itemId: 1,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof DesignerBackgroundItem.name).toBe('string');
        expect(DesignerBackgroundItem.name).toEqual('DesignerBackgroundItem');
    });
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
