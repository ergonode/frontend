/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import ToolBarSelectButton from '@UI/components/ToolBar/ToolBarSelectButton';
import {
    createLocalVue,
    shallowMount,
} from '@vue/test-utils';

const localVue = createLocalVue();

describe('/ToolBar/ToolBarSelectButton', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(ToolBarSelectButton, {
            localVue,
        });
    });

    it('Component is named well', () => {
        expect(typeof ToolBarSelectButton.name).toBe('string');
        expect(ToolBarSelectButton.name).toEqual('ToolBarSelectButton');
    });

    it('Check no title exception', () => {
        expect(wrapper.vm.title).toBeFalsy();
    });
});
