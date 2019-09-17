/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from '@vue/test-utils';
import TemplateGridHeader from '~/components/TemplateGrid/TemplateGridHeader';

describe('TemplateGrid/TemplateGridHeader', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(TemplateGridHeader, {
            propsData: {
                columns: 1,
            },
        });
    });
    it('Component is rendered', () => {
        expect(wrapper.is(TemplateGridHeader)).toBe(true);
    });

    it('Component is named well', () => {
        expect(typeof TemplateGridHeader.name).toBe('string');
        expect(TemplateGridHeader.name).toEqual('TemplateGridHeader');
    });
    it('Check lebels length with default name', () => {
        wrapper.setProps({
            columns: 6,
        });
        const labels = wrapper.findAll('.grid-header__title');
        expect(labels.length).toEqual(6);
        expect(labels.at(0).text()).toMatch('1st level');
        expect(labels.at(1).text()).toMatch('2nd level');
        expect(labels.at(2).text()).toMatch('3rd level');
        expect(labels.at(5).text()).toMatch('6th level');
    });
    it('Check lebels length with other name', () => {
        wrapper.setProps({
            columns: 3,
            headerName: 'name',
        });
        const labels = wrapper.findAll('.grid-header__title');
        expect(labels.length).toEqual(3);
        expect(labels.at(0).text()).toMatch('1st name');
        expect(labels.at(1).text()).toMatch('2nd name');
        expect(labels.at(2).text()).toMatch('3rd name');
    });
});
