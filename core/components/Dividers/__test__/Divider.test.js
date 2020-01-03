/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
// eslint-disable-next-line import/extensions
import Divider from '~/core/components/Dividers/Divider.vue';


describe('Dividers/Divider', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Divider);
    });

    it('Component is named well', () => {
        expect(typeof Divider.name).toBe('string');
        expect(Divider.name).toEqual('Divider');
    });

    it('Check class', () => {
        expect(wrapper.classes()).toContain('divider');
    });
});
