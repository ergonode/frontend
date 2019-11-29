/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import AppContent from '~/core/components/Layout/AppContent.vue';


describe('Layout/AppContent', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(AppContent);
    });

    it('Component is named well', () => {
        expect(typeof AppContent.name).toBe('string');
        expect(AppContent.name).toEqual('AppContent');
        expect(wrapper).toMatchSnapshot();
    });
});
