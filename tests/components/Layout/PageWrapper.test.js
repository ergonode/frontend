/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import PageWrapper from '~/components/Layout/PageWrapper.vue';


describe('Layout/PageWrapper', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(PageWrapper);
    });

    it('Component is rendered', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Component is named well', () => {
        expect(typeof PageWrapper.name).toBe('string');
        expect(PageWrapper.name).toEqual('PageWrapper');
    });
});
