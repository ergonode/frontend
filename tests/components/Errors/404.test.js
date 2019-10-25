/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import Error404 from '~/components/Errors/404.vue';


describe('Errors/404', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Error404);
    });

    it('Component is rendered', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Component is named well', () => {
        expect(typeof Error404.name).toBe('string');
        expect(Error404.name).toEqual('Error404');
    });
});
