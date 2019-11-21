/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import GridPresentationCell from '~/components/Grid/PresentationCells/GridPresentationCell';

describe('Grid/PresentationCells/GridPresentationCell', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(GridPresentationCell, {
            propsData: {
                value: 'Test',
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof GridPresentationCell.name).toBe('string');
        expect(GridPresentationCell.name).toEqual('GridPresentationCell');
    });
});
