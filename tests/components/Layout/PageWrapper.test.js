/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import BasePage from '~/components/Layout/BasePage.vue';


describe('Layout/BasePage', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(BasePage);
    });

    it('Component is named well', () => {
        expect(typeof BasePage.name).toBe('string');
        expect(BasePage.name).toEqual('BasePage');
    });
});
