/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount, createLocalVue } from '@vue/test-utils';
import CheckBox from '~/components/Inputs/CheckBox';

describe('Inputs/CheckBox', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(CheckBox, {
            propsData: {
                isDisabled: false,
                value: 0,
            },
        });
    });
    it('Component is rendered', () => {
        expect(wrapper.is(CheckBox)).toBe(true);
    });

    it('Component is named well', () => {
        expect(typeof CheckBox.name).toBe('string');
        expect(CheckBox.name).toEqual('CheckBox');
    });
});
