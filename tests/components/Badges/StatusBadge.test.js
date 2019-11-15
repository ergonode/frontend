/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import StatusBadge from '~/components/Badges/StatusBadge.vue';
import { WHITE, GRAPHITE_DARK } from '~/assets/scss/_variables/_colors.scss';


describe('Badges/StatusBadge', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(StatusBadge, {
            propsData: {
                color: '#000000',
            }
        });
    });

    it('Component is named well', () => {
        expect(typeof StatusBadge.name).toBe('string');
        expect(StatusBadge.name).toEqual('StatusBadge');
    });


    describe('Props validations', () => {
        it('size', () => {
            const { color } = wrapper.vm.$options.props;

            expect(color.required).toBeTruthy();
            expect(color.type).toBe(String);
        })
    });

});
