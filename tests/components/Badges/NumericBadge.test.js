/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { THEME } from '~/defaults/theme';
import { shallowMount } from '@vue/test-utils';
import NumericBadge from '~/components/Badges/NumericBadge.vue';

describe('Badges/NumericBadge', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(NumericBadge, {
            propsData: {
                number: 0,
            }
        });
    });

    it('Component is named well', () => {
        expect(typeof NumericBadge.name).toBe('string');
        expect(NumericBadge.name).toEqual('NumericBadge');
    });

    describe('Props validations', () => {
        it('theme', () => {
            const { theme } = wrapper.vm.$options.props;

            expect(theme.required).toBeFalsy();
            expect(theme.default).toBe(THEME.PRIMARY);
            expect(theme.type).toBe(String);
            expect(theme.validator && theme.validator('test')).toBeFalsy();
            expect(theme.validator && theme.validator(THEME.PRIMARY)).toBeTruthy();
            expect(theme.validator && theme.validator(THEME.TRANSPARENT)).toBeTruthy();
        })
    });
});
