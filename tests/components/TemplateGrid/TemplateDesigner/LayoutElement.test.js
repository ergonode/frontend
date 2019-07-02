/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount, createLocalVue } from "@vue/test-utils";
import LayoutElement from '~/components/Template/TemplateDesigner/LayoutElement';
import { Store } from 'vuex-mock-store';

const localVue = createLocalVue();
const store = new Store({
    state: {
        draggable: {
            draggedElement: {},
        }
    }
});
const mocks = {
    $store: store,
};

describe('Template/TemplateDesigner/LayoutElement', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(LayoutElement, {
            localVue,
            mocks,
            propsData: {
                index: 1,
                element: { id: 'testId', width: 1, height: 1 },
                columnsNumber: 4,
                rowsNumber: 10,
            },
        });
    });

    it("Component is rendered", () => {
        expect(wrapper.is(LayoutElement)).toBe(true);
    });

    it('Component is named well', () => {
        expect(typeof LayoutElement.name).toBe('string');
        expect(LayoutElement.name).toEqual('LayoutElement');
    });

    describe('Dragging events', () => {
        it('Element is set as dragged ondragstart', () => {
            wrapper.find('.layout-element').trigger('dragstart');

        });
    });
});
