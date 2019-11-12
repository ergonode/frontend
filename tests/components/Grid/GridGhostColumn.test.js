/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount,  } from '@vue/test-utils';
import GridColumnGhost from '~/components/Grid/Columns/GridColumnGhost';
import {
    WHITE, GRAPHITE,
} from '~/assets/scss/_variables/_colors.scss';

describe('Grid/GridColumnGhost', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(GridColumnGhost);
    });

    it('Component is named well', () => {
        expect(typeof GridColumnGhost.name).toBe('string');
        expect(GridColumnGhost.name).toEqual('GridColumnGhost');
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
