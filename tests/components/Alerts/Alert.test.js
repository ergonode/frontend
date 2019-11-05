/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Alert from '~/components/Alerts/Alert.vue';

const localVue = createLocalVue();

describe('Alert', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Alert, {
            localVue,
            propsData: {
                alert: {
                    id: 1,
                    type: 'info',
                    message: 'Ya, know...',
                },
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof Alert.name).toBe('string');
        expect(Alert.name).toEqual('Alert');
    });

    describe('Info Alert', () => {
        beforeEach(() => {
            wrapper.setProps({
                alert: {
                    id: 1,
                    type: 'info',
                    message: 'Ya, know...',
                },
            });
        });

        it('Alert has proper class', () => {
            expect(wrapper.vm.typeClass).toBe('alert--info');
        });

        it('Alert has capitalized type', () => {
            expect(wrapper.vm.capitalizedAlertType).toBe('Info');
        });
    });

    describe('Warning Alert', () => {
        beforeEach(() => {
            wrapper.setProps({
                alert: {
                    id: 1,
                    type: 'success',
                    message: 'Success!!!',
                },
            });
        });

        it('Alert has proper class', () => {
            expect(wrapper.vm.typeClass).toBe('alert--success');
        });

        it('Alert has capitalized type', () => {
            expect(wrapper.vm.capitalizedAlertType).toBe('Success');
        });
    });

    describe('Error Alert', () => {
        beforeEach(() => {
            wrapper.setProps({
                alert: {
                    id: 1,
                    type: 'error',
                    message: 'You did wrong!!!',
                },
            });
        });

        it('Alert has proper class', () => {
            expect(wrapper.vm.typeClass).toBe('alert--error');
        });

        it('Alert has capitalized type', () => {
            expect(wrapper.vm.capitalizedAlertType).toBe('Error');
        });
    });

    describe('Warning Alert', () => {
        beforeEach(() => {
            wrapper.setProps({
                alert: {
                    id: 1,
                    type: 'warning',
                    message: 'You better watch out!!!',
                },
            });
        });

        it('Alert has proper class', () => {
            expect(wrapper.vm.typeClass).toBe('alert--warning');
        });

        it('Alert has capitalized type', () => {
            expect(wrapper.vm.capitalizedAlertType).toBe('Warning');
        });
    });
});
