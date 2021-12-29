/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    GRAPHITE_DARK,
} from '@UI/assets/scss/_js-variables/colors.scss';
import PointBadge from '@UI/components/Badges/PointBadge';
import {
    shallowMount,
} from '@vue/test-utils';

describe('Badges/PointBadge', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(PointBadge, {
            propsData: {
                color: GRAPHITE_DARK,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof PointBadge.name).toBe('string');
        expect(PointBadge.name).toEqual('PointBadge');
    });

    describe('Props validations', () => {
        it('size', () => {
            const {
                color,
            } = wrapper.vm.$options.props;

            expect(color.required).toBeTruthy();
            expect(color.type).toBe(String);
        });
    });
});
