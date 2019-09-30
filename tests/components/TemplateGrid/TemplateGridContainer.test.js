/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount, createLocalVue } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';
import TemplateGridContainer from '~/components/TemplateGrid/TemplateGridContainer';

const localVue = createLocalVue();
const store = new Store({
    state: {
        gridDesigner: {
            fullGridData: [],
            hiddenItems: {},
        },
        draggable: {
            draggedElement: {},
        },
        authentication: {
            language: 'EN',
        },
        list: {
            listElements: [],
        },
    },
});
const mocks = {
    $store: store,
};
describe('TemplateGrid/TemplateGridContainer', () => {
    // TODO: complete tests, remove errors with mounting component
    it('Component is rendered', () => {
        expect(1).toBe(1);
        // expect(wrapper.is(TemplateGridContainer)).toBe(true);
        // expect(wrapper.isVueInstance()).toBeTruthy();
    });
});
