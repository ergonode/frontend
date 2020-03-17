/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import { WHITE, GRAPHITE_DARK } from '@Core/assets/scss/_js-variables/colors.scss';
import { SIZE } from '@Core/defaults/theme';
import InformationBadge from '@Core/components/Badges/InformationBadge.vue';

describe('Badges/InformationBadge', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(InformationBadge, {
            propsData: {
                title: 'Default',
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof InformationBadge.name).toBe('string');
        expect(InformationBadge.name).toEqual('InformationBadge');
    });

    describe('Styling', () => {
        it('backgroundColor', () => {
            expect(wrapper.vm.badgeStyles).toStrictEqual({
                backgroundColor: WHITE,
                color: GRAPHITE_DARK,
            });
        });
    });

    describe('Props validations', () => {
        it('size', () => {
            const { size } = wrapper.vm.$options.props;

            expect(size.required).toBeFalsy();
            expect(size.default).toBe(SIZE.REGULAR);
            expect(size.type).toBe(String);
            expect(size.validator && size.validator('test')).toBeFalsy();
            expect(size.validator && size.validator(SIZE.REGULAR)).toBeTruthy();
            expect(size.validator && size.validator(SIZE.SMALL)).toBeTruthy();
        });
    });
});
