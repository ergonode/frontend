/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Button from '~/components/Buttons/BaseButton';

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
        expect(Button.name).toEqual('BaseButton');
    });

    it('Check if button has not children', () => {
        const icon = wrapper.find('.btn__icon');
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

    it('Check title classes', () => {
        expect(wrapper.vm.titleClasses).toStrictEqual(["btn__title", {"font--semi-bold-12-16": false, "font--semi-bold-14-16": true}]
        );
    });

    it('Check button classes if no props', () => {
        expect(wrapper.vm.btnClasses).toStrictEqual([
            'btn',
            'btn--primary',
            'btn--regular',
            {
                'btn--plain': false,
            },
        ]);
    });

    it('Check button classes', () => {
        wrapper.setProps({
            theme: 'secondary',
            size: 'small',
            plain: true,
        });
        expect(wrapper.vm.btnClasses).toStrictEqual([
            'btn',
            'btn--secondary',
            'btn--small',
            {
                'btn--plain': true,
            },
        ]);
    });
});
