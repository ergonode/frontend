/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import CheckBox from '@Core/components/Inputs/CheckBox';
import { STATE } from '@Core/defaults/inputs/checkbox';

describe('Inputs/CheckBox', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(CheckBox, {
            propsData: {
                isDisabled: false,
                value: STATE.UNCHECK,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof CheckBox.name).toBe('string');
        expect(CheckBox.name).toEqual('CheckBox');
    });
});
