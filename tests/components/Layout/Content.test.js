/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import Content from '~/components/Layout/Content.vue';


describe('Layout/Content', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Content);
    });

    it('Component is named well', () => {
        expect(typeof Content.name).toBe('string');
        expect(Content.name).toEqual('Content');
    });
});
