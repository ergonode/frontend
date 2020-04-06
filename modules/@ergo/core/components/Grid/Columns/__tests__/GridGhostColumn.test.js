/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import GridGhostColumn from '@Core/components/Grid/Layout/TableColumns/GridGhostColumn';
import {
    WHITE, GRAPHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';

describe('Grid/GridGhostColumn', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(GridGhostColumn);
    });

    it('Component is named well', () => {
        expect(typeof GridGhostColumn.name).toBe('string');
        expect(GridGhostColumn.name).toEqual('GridGhostColumn');
    });

    describe('Mouse position', () => {
        it('Is over ghost column', () => {
            wrapper.setProps({
                isMouseOverGrid: false,
            });

            expect(wrapper.vm.addIconFillColor).toBe(GRAPHITE);
        });

        it('Is not inside grid', () => {
            wrapper.setProps({
                isMouseOverGrid: true,
            });

            expect(wrapper.vm.addIconFillColor).toBe(WHITE);
        });
    });
});
