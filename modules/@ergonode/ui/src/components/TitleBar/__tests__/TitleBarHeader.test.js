/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import TitleBarHeader from '@UI/components/TitleBar/TitleBarHeader';
import {
    mount,
} from '@vue/test-utils';

describe('TitleBar/TitleBarHeader', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(TitleBarHeader, {
            propsData: {
                title: 'test',
                isBreadcrumb: true,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof TitleBarHeader.name).toBe('string');
        expect(TitleBarHeader.name).toEqual('TitleBarHeader');
    });

    it('Header has breadcrumb', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
