/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import Alert from '@UI/components/Alert/Alert';
import {
    createLocalVue,
    shallowMount,
} from '@vue/test-utils';

const localVue = createLocalVue();

describe('Alert', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Alert, {
            localVue,
            propsData: {
                id: 1,
                type: ALERT_TYPE.INFO,
                message: 'Ya, know...',
            },
            stubs: {
                Fab: true,
                Icon: true,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof Alert.name).toBe('string');
        expect(Alert.name).toEqual('Alert');
    });

    describe('Success Alert', () => {
        beforeEach(() => {
            wrapper.setProps({
                id: 1,
                type: ALERT_TYPE.SUCCESS,
                message: 'Ya, know...',
            });
        });

        it('Alert has proper class', () => {
            expect(wrapper.vm.classes).toStrictEqual([
                'alert',
                `alert--${ALERT_TYPE.SUCCESS}`,
            ]);
        });

        it('Alert has capitalized type', () => {
            expect(wrapper.vm.capitalizedAlertType).toBe('Success');
        });
    });

    describe('Info Alert', () => {
        beforeEach(() => {
            wrapper.setProps({
                id: 1,
                type: ALERT_TYPE.INFO,
                message: 'Ya, know...',
            });
        });

        it('Alert has proper class', () => {
            expect(wrapper.vm.classes).toStrictEqual([
                'alert',
                `alert--${ALERT_TYPE.INFO}`,
            ]);
        });

        it('Alert has capitalized type', () => {
            expect(wrapper.vm.capitalizedAlertType).toBe('Info');
        });
    });

    describe('Warning Alert', () => {
        beforeEach(() => {
            wrapper.setProps({
                id: 1,
                type: ALERT_TYPE.WARNING,
                message: 'Warning!!!',
            });
        });

        it('Alert has proper class', () => {
            expect(wrapper.vm.classes).toStrictEqual([
                'alert',
                `alert--${ALERT_TYPE.WARNING}`,
            ]);
        });

        it('Alert has capitalized type', () => {
            expect(wrapper.vm.capitalizedAlertType).toBe('Warning');
        });
    });

    describe('Error Alert', () => {
        beforeEach(() => {
            wrapper.setProps({
                id: 1,
                type: ALERT_TYPE.ERROR,
                message: 'You did wrong!!!',
            });
        });

        it('Alert has proper class', () => {
            expect(wrapper.vm.classes).toStrictEqual([
                'alert',
                `alert--${ALERT_TYPE.ERROR}`,
            ]);
        });

        it('Alert has capitalized type', () => {
            expect(wrapper.vm.capitalizedAlertType).toBe('Error');
        });
    });
});
