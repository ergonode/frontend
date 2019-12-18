/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import Blur from '~/components/Blur/Blur.vue';


describe('Blur/Blur', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Blur);
    });

    it('Component is named well', () => {
        expect(typeof Blur.name).toBe('string');
        expect(Blur.name).toEqual('Blur');
    });

    it('Check class', () => {
        expect(wrapper.classes()).toContain('blur');
    });
});
