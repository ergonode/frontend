/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mount } from '@vue/test-utils';
import Toggler from '~/components/Inputs/Toggler/Toggler';

describe('Inputs/Toggler/Toggler', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(Toggler);
    });
    it('Component is rendered', () => {
        expect(wrapper.is(Toggler)).toBe(true);
    });

    it('Component is named well', () => {
        expect(typeof Toggler.name).toBe('string');
        expect(Toggler.name).toEqual('Toggler');
    });

    it('Emited toggler state on click', () => {
        wrapper.find('.toggler').trigger('click');

        expect(wrapper.emitted().input).toBeTruthy();
        expect(wrapper.emitted().input[0][0]).toEqual(!wrapper.vm.value);
    });

    describe('Toggler state classes', () => {
        it('Is disabled', () => {
            wrapper.setProps({
                disabled: true,
            });

            expect(wrapper.vm.$el.classList.contains('toggler--disabled'));
        });

        it('Is not disabled', () => {
            expect(!wrapper.vm.$el.classList.contains('toggler--disabled'));
        });

        it('Is selected', () => {
            wrapper.setProps({
                disabled: true,
            });

            expect(wrapper.vm.$el.classList.contains('toggler--selected'));
        });

        it('Is not selected', () => {
            expect(!wrapper.vm.$el.classList.contains('toggler--selected'));
        });
    });
});
