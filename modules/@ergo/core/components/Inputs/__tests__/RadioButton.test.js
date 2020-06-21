/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import RadioButton from '@Core/components/Inputs/RadioButton';
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
            expect(wrapper.vm.radioStateClasses).toStrictEqual([
                {
                    'radio--disabled': false,
                    'radio--selected': true,
                },
            ]);
        });

        it('Is deselected', () => {
            wrapper.setProps({
                disabled: false,
                label: 'test',
                value: 'x',
            });

            expect(wrapper.vm.isSelected).toBeFalsy();
            expect(wrapper.vm.radioStateClasses).toStrictEqual([
                {
                    'radio--disabled': false,
                    'radio--selected': false,
                },
            ]);
        });
    });

    describe('Disabled state', () => {
        it('Is selected', () => {
            wrapper.setProps({
                disabled: true,
                value: 'test',
                label: 'test',
            });

            expect(wrapper.vm.isSelected).toBeTruthy();
            expect(wrapper.vm.radioStateClasses).toStrictEqual([
                {
                    'radio--disabled': true,
                    'radio--selected': true,
                },
            ]);
        });

        it('Is deselected', () => {
            wrapper.setProps({
                disabled: true,
                value: 'test',
                label: 'x',
            });

            expect(wrapper.vm.isSelected).toBeFalsy();
            expect(wrapper.vm.radioStateClasses).toStrictEqual([
                {
                    'radio--disabled': true,
                    'radio--selected': false,
                },
            ]);
        });
    });

    // FIXME
    // describe('Selection', () => {
    //     it('Is selected', () => {
    //         wrapper.setProps({
    //             label: 'test',
    //         });
    //         wrapper.find('input').trigger('click');
    //         expect(wrapper.emitted().input).toBeTruthy();
    //         expect(wrapper.emitted().input[0][0]).toEqual(wrapper.vm.label);
    //     });
    // });
});
