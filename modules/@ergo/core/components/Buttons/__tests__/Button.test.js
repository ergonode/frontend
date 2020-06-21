/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Button from '@Core/components/Buttons/Button';
import { createLocalVue, shallowMount } from '@vue/test-utils';

const localVue = createLocalVue();

describe('Buttons/Button', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Button, {
            localVue,
        });
    });
    afterEach(() => {
        wrapper.destroy();
    });

    it('Component is named well', () => {
        expect(typeof Button.name).toBe('string');
        expect(Button.name).toEqual('Button');
    });

    it('Check if button has not children', () => {
        const icon = wrapper.find('.button__icon');
        const label = wrapper.find('label');
        expect(icon.exists()).toBe(false);
        expect(label.exists()).toBe(false);
    });

    it('Check if button has children', () => {
        wrapper.setProps({
            title: 'paper',
        });
        expect(wrapper.vm.title).toBe('paper');
    });

    it('Check button classes if no props', () => {
        expect(wrapper.vm.buttonClasses).toStrictEqual([
            'button',
            'button--primary',
            'button--regular',
        ]);
    });

    it('Check button classes', () => {
        wrapper.setProps({
            theme: 'secondary',
            size: 'small',
        });
        expect(wrapper.vm.buttonClasses).toStrictEqual([
            'button',
            'button--secondary',
            'button--small',
        ]);
    });
});
