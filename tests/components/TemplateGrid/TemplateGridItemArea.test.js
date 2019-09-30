/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from '@vue/test-utils';
import TemplateGridItemArea from '~/components/TemplateGrid/TemplateGridItemArea';

describe('TemplateGrid/TemplateGridItemArea', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(TemplateGridItemArea, {
            propsData: {
                item: {
                    id: 'test',
                    column: 1,
                },
                columns: 2,
            },
        });
    });
    it('Component is rendered', () => {
        expect(wrapper.is(TemplateGridItemArea)).toBe(true);
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Component is named well', () => {
        expect(typeof TemplateGridItemArea.name).toBe('string');
        expect(TemplateGridItemArea.name).toEqual('TemplateGridItemArea');
    });
    it('Component has main class', () => {
        expect(wrapper.contains('.grid__item-area')).toBeTruthy();
        expect(wrapper.vm.$el).toMatchSnapshot();
    });
    it('Check item data', () => {
        expect(wrapper.vm.item).toStrictEqual({
            column: 1,
            id: 'test',
        });
        expect(wrapper.contains('[item-id="test"]')).toBe(true);
    });
    it('Check item style with default props', () => {
        expect(wrapper.vm.gridItemStyles).toStrictEqual({
            gridColumn: '2 / 3',
            gridGap: '0px',
            gridTemplateColumns: 'repeat(1, 1fr)',
            padding: '0px',
        });
    });
    it('Check item style with new props', () => {
        wrapper.setProps({
            item: {
                id: 'test',
                column: 3,
            },
            columns: 6,
            gridGap: 10,
        });
        expect(wrapper.vm.gridItemStyles).toStrictEqual({
            gridColumn: '4 / 7',
            gridGap: '10px',
            gridTemplateColumns: 'repeat(3, 1fr)',
            padding: '10px',
        });
    });
});
