/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    GRAPHITE_DARK,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import InformationBadge from '@UI/components/Badges/InformationBadge';
import {
    shallowMount,
} from '@vue/test-utils';

describe('Badges/InformationBadge', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(InformationBadge, {
            propsData: {
                title: 'Default',
            },
            stubs: {
                BadgeLabel: true,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof InformationBadge.name).toBe('string');
        expect(InformationBadge.name).toEqual('InformationBadge');
    });

    describe('Styling', () => {
        it('backgroundColor', () => {
            expect(wrapper.vm.styles).toStrictEqual({
                backgroundColor: WHITE,
                color: GRAPHITE_DARK,
            });
        });
    });

    describe('Props validations', () => {
        it('size', () => {
            const {
                size,
            } = wrapper.vm.$options.props;

            expect(size.required).toBeFalsy();
            expect(size.default).toBe(SIZE.REGULAR);
            expect(size.type).toBe(String);
            expect(size.validator && size.validator('test')).toBeFalsy();
            expect(size.validator && size.validator(SIZE.REGULAR)).toBeTruthy();
            expect(size.validator && size.validator(SIZE.SMALL)).toBeTruthy();
        });
    });
});
