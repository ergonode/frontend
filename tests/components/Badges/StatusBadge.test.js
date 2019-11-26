/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import PointBadge from '~/components/Badges/PointBadge.vue';
import { WHITE, GRAPHITE_DARK } from '~/assets/scss/_variables/_colors.scss';


describe('Badges/PointBadge', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(PointBadge, {
            propsData: {
                color: '#000000',
            }
        });
    });

    it('Component is named well', () => {
        expect(typeof PointBadge.name).toBe('string');
        expect(PointBadge.name).toEqual('PointBadge');
    });


    describe('Props validations', () => {
        it('size', () => {
            const { color } = wrapper.vm.$options.props;

            expect(color.required).toBeTruthy();
            expect(color.type).toBe(String);
        })
    });

});
