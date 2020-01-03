/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
// eslint-disable-next-line import/extensions
import Error404 from '~/core/components/Layout/Errors/404.vue';


describe('Errors/404', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Error404);
    });

    it('Component is named well', () => {
        expect(typeof Error404.name).toBe('string');
        expect(Error404.name).toEqual('Error404');
        expect(wrapper).toMatchSnapshot();
    });
});
