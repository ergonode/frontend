/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { WHITE, GRAPHITE_DARK } from '~/assets/scss/_variables/_colors.scss';
import { SIZES} from '~/defaults/badge';
import { shallowMount } from '@vue/test-utils';
import InformationBadge from '~/components/Badges/InformationBadge.vue';

describe('Badges/InformationBadge', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(InformationBadge, {
          propsData: {
              title: 'Default',
          }
      });
    });

    it('Component is named well', () => {
        expect(typeof InformationBadge.name).toBe('string');
        expect(InformationBadge.name).toEqual('InformationBadge');
    });

    describe('Styling', () => {
        it('backgroundColor', () => {
            expect(wrapper.vm.backgroundColorStyle).toStrictEqual({
                backgroundColor: WHITE,
            });
        });

        it('text color', () => {
            expect(wrapper.vm.textColorStyle).toStrictEqual({
                color: GRAPHITE_DARK,
            });
        });
    });

    describe('Props validations', () => {
        it('size', () => {
            const { size } = wrapper.vm.$options.props;

            expect(size.required).toBeFalsy();
            expect(size.default).toBe(SIZES.REGULAR);
            expect(size.type).toBe(String);
            expect(size.validator && size.validator('test')).toBeFalsy();
            expect(size.validator && size.validator(SIZES.REGULAR)).toBeTruthy();
            expect(size.validator && size.validator(SIZES.SMALL)).toBeTruthy();
        })
    });
});
