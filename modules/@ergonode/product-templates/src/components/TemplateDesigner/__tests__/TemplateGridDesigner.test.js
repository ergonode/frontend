/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Designer from '@UI/components/Designer/Designer';
import DesignerBackgroundLayer from '@UI/components/Designer/DesignerBackgroundLayer';
import {
    shallowMount,
} from '@vue/test-utils';

const columnsNumber = 4;
const maxRows = 0;
const rowHeight = 50;
const gridStyle = {
    gridTemplateColumns: `repeat(${columnsNumber}, 1fr)`,
    gridAutoRows: `${rowHeight}px`,
};

describe('Template/Base/Designer', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Designer, {
            attachToDocument: true,
            propsData: {
                maxRow: maxRows,
                rowHeight,
            },
            slots: {
                default: {
                    render(h) {
                        return h(DesignerBackgroundLayer, {
                            props: {
                                gridStyles: gridStyle,
                                columns: columnsNumber,
                                rows: maxRows,
                                isHeader: false,
                            },
                        });
                    },
                },
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof Designer.name).toBe('string');
        expect(Designer.name).toEqual('Designer');
    });

    it('Check if resizing event was called', () => {
        const resizeEvent = jest.fn();
        window.addEventListener('resize', resizeEvent);
        window.dispatchEvent(new Event('resize'));

        expect(resizeEvent).toHaveBeenCalled();
    });

    it('Template designer has correct number of rows', () => {
        const totalRows1 = wrapper.vm.getTotalRowsInTemplate();
        expect(totalRows1).toBe(1);

        wrapper.setProps({
            maxRow: 10,
        });

        const totalRows2 = wrapper.vm.getTotalRowsInTemplate();
        expect(totalRows2).toBe(11);
    });

    it('Template designer has presentation layer as a child', () => {
        const presentationLayer = wrapper.find(DesignerBackgroundLayer);

        expect(presentationLayer.isVueInstance()).toBe(true);
    });

    it('Check if number of max rows number was emitted', () => {
        wrapper.vm.$emit('rows-count');

        expect(wrapper.emitted()['rows-count']).toBeTruthy();
    });
});
