/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from "@vue/test-utils";
import TemplateGridGhostItem from '~/components/TemplateGrid/TemplateDesigner/TemplateGridGhostItem';

describe('TemplateGrid/TemplateDesigner/TemplateGridGhostItem', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(TemplateGridGhostItem, {
            propsData: {
                position: { row: 1, column: 1 },
            },
        });
    });

    it("Component is rendered", () => {
        expect(wrapper.is(TemplateGridGhostItem)).toBe(true);
    });

    it('Component is named well', () => {
        expect(typeof TemplateGridGhostItem.name).toBe('string');
        expect(TemplateGridGhostItem.name).toEqual('TemplateGridGhostItem');
    });

    it('Component is highlighted', () => {
        wrapper.setProps({
            highlightingPositions: [
                {
                    row: 1,
                    column: 1,
                },
            ],
        });

        expect(wrapper.vm.isHighlighted).toBeTruthy();
    });

    it('Component is not highlighted', () => {
        wrapper.setProps({
            highlightingPositions: [
                {
                    row: 1,
                    column: 2,
                },
            ],
        });

        expect(wrapper.vm.isHighlighted).toBeFalsy();
    });
});
