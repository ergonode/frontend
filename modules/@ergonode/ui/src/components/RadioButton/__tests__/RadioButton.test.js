/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import RadioButton from '@UI/components/RadioButton/RadioButton';
import {
    shallowMount,
} from '@vue/test-utils';

describe('Inputs/RadioButton', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(RadioButton);
    });

    it('Component is named well', () => {
        expect(typeof RadioButton.name).toBe('string');
        expect(RadioButton.name).toEqual('RadioButton');
    });

    describe('Active state', () => {
        it('Is selected', () => {
            wrapper.setProps({
                disabled: false,
                label: 'test',
                value: 'test',
            });

            expect(wrapper.vm.isSelected).toBeTruthy();
            expect(wrapper.vm.classes).toStrictEqual([
                'radio-button',
                {
                    'radio-button--disabled': false,
                    'radio-button--selected': true,
                },
            ]);
        });

        it('Is deselected', async () => {
            await wrapper.setProps({
                disabled: false,
                label: 'test',
                value: 'x',
            });

            expect(wrapper.vm.isSelected).toBeFalsy();
            expect(wrapper.vm.classes).toStrictEqual([
                'radio-button',
                {
                    'radio-button--disabled': false,
                    'radio-button--selected': false,
                },
            ]);
        });
    });

    describe('Disabled state', () => {
        it('Is selected', async () => {
            await wrapper.setProps({
                disabled: true,
                value: 'test',
                label: 'test',
            });

            expect(wrapper.vm.isSelected).toBeTruthy();
            expect(wrapper.vm.classes).toStrictEqual([
                'radio-button',
                {
                    'radio-button--disabled': true,
                    'radio-button--selected': true,
                },
            ]);
        });

        it('Is deselected', async () => {
            await wrapper.setProps({
                disabled: true,
                value: 'test',
                label: 'x',
            });

            expect(wrapper.vm.isSelected).toBeFalsy();
            expect(wrapper.vm.classes).toStrictEqual([
                'radio-button',
                {
                    'radio-button--disabled': true,
                    'radio-button--selected': false,
                },
            ]);
        });
    });
});
