/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import App from '~/core/components/Layout/App.vue';


describe('Layout/App', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(App);
    });

    it('Component is named well', () => {
        expect(typeof App.name).toBe('string');
        expect(App.name).toEqual('App');
        expect(wrapper).toMatchSnapshot();
    });
});
