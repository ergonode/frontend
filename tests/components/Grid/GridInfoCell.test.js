/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from '@vue/test-utils';
import GridInfoCell from '~/components/Grid/GridInfoCell';

describe('Grid/GridInfoCell', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(GridInfoCell, {
            propsData: {
                value: 'Test',
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof GridInfoCell.name).toBe('string');
        expect(GridInfoCell.name).toEqual('GridInfoCell');
    });
});
