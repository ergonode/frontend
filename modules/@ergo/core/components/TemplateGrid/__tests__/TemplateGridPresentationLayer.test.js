/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from '@vue/test-utils';
import TemplateGridPresentationLayer from '../TemplateGridPresentationLayer';

describe('TemplateGrid/TemplateGridPresentationLayer', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(TemplateGridPresentationLayer, {
            propsData: {
                columns: 2,
                rows: 2,
                isHeader: false,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof TemplateGridPresentationLayer.name).toBe('string');
        expect(TemplateGridPresentationLayer.name).toEqual('TemplateGridPresentationLayer');
    });

    it('Check number of items', () => {
        expect(TemplateGridPresentationLayer.computed.numberOfItems.call({
            columns: 3, rows: 10,
        })).toBe(30);
    });

    it('Check default props', () => {
        expect(wrapper.vm.columns).toBe(2);
        expect(wrapper.vm.rows).toBe(2);
        expect(wrapper.vm.isHeader).toBe(false);
    });

    it('Check main classes witch default props', () => {
        const children = wrapper.findAll('.presentation-layer > div');
        expect(wrapper.contains('.presentation-layer')).toBeTruthy();
        expect(wrapper.contains('.presentation-layer__border-top')).toBeTruthy();
        expect(children.length).toEqual(4);
        expect(children.at(0).contains('.shadow-grid-item--last-row')).toBeFalsy();
        expect(children.at(1).contains('.shadow-grid-item--last-row')).toBeFalsy();
        expect(children.at(2).contains('.shadow-grid-item--last-row')).toBeTruthy();
        expect(children.at(3).contains('.shadow-grid-item--last-row')).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    // FIXME
    // it('Check main classes witch new props', () => {
    //     wrapper.setProps({
    //         columns: 3,
    //         isHeader: true,
    //     });
    //
    //     const children = wrapper.findAll('.presentation-layer > div');
    //     expect(wrapper.find('.presentation-layer').exists()).toBeTruthy();
    //     expect(wrapper.contains('.presentation-layer__border-top')).toBeFalsy();
    //     expect(children.length).toEqual(6);
    //     expect(wrapper).toMatchSnapshot();
    // });

    it.each([
        [1, false],
        [2, false],
        [3, true],
        [4, true],
    ])(
        'Set index (%s) get (%s)',
        (nr, bool) => {
            const check = wrapper.vm.markLastRow(nr);
            expect(check).toBe(bool);
        },
    );
});
