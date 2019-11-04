/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import CheckBox from '~/components/Inputs/CheckBox';

describe('Inputs/CheckBox', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(CheckBox, {
            propsData: {
                isDisabled: false,
                value: 0,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof CheckBox.name).toBe('string');
        expect(CheckBox.name).toEqual('CheckBox');
    });

    describe('Emitting values', () => {
        it('For value = true', () => {
            wrapper.setProps({
                value: true,
            });
            wrapper.find('input').trigger('click');
            expect(wrapper.emitted().input).toBeTruthy();
            expect(wrapper.emitted().input[0][0]).toEqual(!wrapper.vm.value);
        });

        it('For value = false', () => {
            wrapper.setProps({
                value: false,
            });
            wrapper.find('input').trigger('click');
            expect(wrapper.emitted().input).toBeTruthy();
            expect(wrapper.emitted().input[0][0]).toEqual(!wrapper.vm.value);
        });

        it('For value = 0', () => {
            wrapper.setProps({
                value: 0,
            });
            wrapper.find('input').trigger('click');
            expect(wrapper.emitted().input).toBeTruthy();
            expect(wrapper.emitted().input[0][0]).toEqual(1);
        });

        it('For value = 1', () => {
            wrapper.setProps({
                value: 1,
            });
            wrapper.find('input').trigger('click');
            expect(wrapper.emitted().input).toBeTruthy();
            expect(wrapper.emitted().input[0][0]).toEqual(0);
        });

        it('For value = 2', () => {
            wrapper.setProps({
                value: 2,
            });
            wrapper.find('input').trigger('click');
            expect(wrapper.emitted().input).toBeTruthy();
            expect(wrapper.emitted().input[0][0]).toEqual(0);
        });
    });
});
