/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from '@vue/test-utils';
import TemplateGridItemsContainer from '~/components/TemplateGrid/TemplateGridItemsContainer';

describe('TemplateGrid/TemplateGridItemsContainer', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(TemplateGridItemsContainer);
    });

    it('Component is named well', () => {
        expect(typeof TemplateGridItemsContainer.name).toBe('string');
        expect(TemplateGridItemsContainer.name).toEqual('TemplateGridItemsContainer');
    });
    it('Component has main class', () => {
        expect(wrapper.contains('.grid-items-container')).toBeTruthy();
        expect(wrapper.vm.$el).toMatchSnapshot();
    });
});
