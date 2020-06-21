/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import TitleBar from '@Core/components/TitleBar/TitleBar';
import { shallowMount } from '@vue/test-utils';

describe('TitleBar/TitleBar', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(TitleBar, {
            propsData: {
                title: 'test',
                isReadOnly: true,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof TitleBar.name).toBe('string');
        expect(TitleBar.name).toEqual('TitleBar');
    });

    it('TitleBar is rendered with information badge', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
