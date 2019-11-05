/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import Error403 from '~/components/Errors/403.vue';


describe('Errors/403', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Error403);
    });

    it('Component is named well', () => {
        expect(typeof Error403.name).toBe('string');
        expect(Error403.name).toEqual('Error403');
    });
});
