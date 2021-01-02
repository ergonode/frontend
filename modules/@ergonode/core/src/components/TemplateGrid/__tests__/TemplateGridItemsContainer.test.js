/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    shallowMount,
} from '@vue/test-utils';

import TemplateGridItemsLayer from '../TemplateGridItemsLayer';

describe('TemplateGrid/TemplateGridItemsLayer', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(TemplateGridItemsLayer);
    });

    it('Component is named well', () => {
        expect(typeof TemplateGridItemsLayer.name).toBe('string');
        expect(TemplateGridItemsLayer.name).toEqual('TemplateGridItemsLayer');
    });
    it('Component has main class', () => {
        expect(wrapper.find('.template-grid-items-layer')).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });
});
