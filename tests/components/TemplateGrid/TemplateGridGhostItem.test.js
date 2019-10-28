/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from '@vue/test-utils';
import TemplateGridGhostItem from '~/components/TemplateGrid/TemplateGridGhostItem';

describe('TemplateGrid/TemplateGridGhostItem', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(TemplateGridGhostItem);
    });

    it('Component is named well', () => {
        expect(typeof TemplateGridGhostItem.name).toBe('string');
        expect(TemplateGridGhostItem.name).toEqual('TemplateGridGhostItem');
    });

    it('Component has main class', () => {
        expect(wrapper.contains('.grid__ghost-item')).toBeTruthy();
    });
});
