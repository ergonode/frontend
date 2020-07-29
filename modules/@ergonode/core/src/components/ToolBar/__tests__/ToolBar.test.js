/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import ToolBar from '@Core/components/ToolBar/ToolBar';
import {
    createLocalVue,
    shallowMount,
} from '@vue/test-utils';

const localVue = createLocalVue();
describe('ToolBar', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(ToolBar, {
            localVue,
        });
    });

    it('Component is named well', () => {
        expect(typeof ToolBar.name).toBe('string');
        expect(ToolBar.name).toEqual('ToolBar');
    });
});
