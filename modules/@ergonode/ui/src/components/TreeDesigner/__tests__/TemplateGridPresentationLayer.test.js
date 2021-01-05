/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import DesignerBackgroundLayer from '@UI/components/Designer/DesignerBackgroundLayer';
import {
    mount,
} from '@vue/test-utils';

describe('TreeDesigner/DesignerBackgroundLayer', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(DesignerBackgroundLayer, {
            propsData: {
                columns: 2,
                rows: 2,
                isHeader: false,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof DesignerBackgroundLayer.name).toBe('string');
        expect(DesignerBackgroundLayer.name).toEqual('DesignerBackgroundLayer');
    });

    it('Check number of items', () => {
        expect(DesignerBackgroundLayer.computed.numberOfItems.call({
            columns: 3,
            rows: 10,
        })).toBe(30);
    });

    it('Check default props', () => {
        expect(wrapper.vm.columns).toBe(2);
        expect(wrapper.vm.rows).toBe(2);
        expect(wrapper.vm.isHeader).toBe(false);
    });

    it('Check main classes witch default props', () => {
        const children = wrapper.findAll('.designer-background-layer > div');
        expect(wrapper.find('.designer-background-layer')).toBeTruthy();
        expect(wrapper.find('.template-grid-background-layer__border-top')).toBeTruthy();
        expect(children.length).toEqual(4);
        expect(wrapper).toMatchSnapshot();
    });

    // FIXME
    // it('Check main classes witch new props', () => {
    //     wrapper.setProps({
    //         columns: 3,
    //         isHeader: true,
    //     });
    //
    //     const children = wrapper.findAll('.designer-background-layer > div');
    //     expect(wrapper.find('.designer-background-layer').exists()).toBeTruthy();
    //     expect(wrapper.find('.template-grid-background-layer__border-top')).toBeFalsy();
    //     expect(children.length).toEqual(6);
    //     expect(wrapper).toMatchSnapshot();
    // });

    it.each([
        [
            1,
            false,
        ],
        [
            2,
            false,
        ],
        [
            3,
            true,
        ],
        [
            4,
            true,
        ],
    ])(
        'Set index (%s) get (%s)',
        (nr, bool) => {
            const check = wrapper.vm.markLastRow(nr);
            expect(check).toBe(bool);
        },
    );
});
