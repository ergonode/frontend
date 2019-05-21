/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from '@vue/test-utils';
import GridTitle from '~/components/Grid/GridTitle';

describe('GridTitle', () => {
    const wrapper = mount(GridTitle, {
        propsData: {
            title: 'My amazing title',
        },
    });

    it('mounted GridTitle', () => {
        expect(wrapper).toBeTruthy();
    });

    it('has a span', () => {
        expect(wrapper.contains('span')).toBe(true);
    });
});
