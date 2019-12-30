/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import TemplateGridItemArea from '../TemplateGridItemArea';

describe('TemplateGrid/TemplateGridItemArea', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(TemplateGridItemArea, {
            propsData: {
                item: {
                    id: 'test',
                    column: 1,
                },
                columns: 2,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof TemplateGridItemArea.name).toBe('string');
        expect(TemplateGridItemArea.name).toEqual('TemplateGridItemArea');
    });
    it('Component has main class', () => {
        expect(wrapper.contains('.grid__item-area')).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
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
            marginLeft: '0px',
            padding: '0px 0',
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
            marginLeft: '10px',
            padding: '10px 0',
        });
    });
});
