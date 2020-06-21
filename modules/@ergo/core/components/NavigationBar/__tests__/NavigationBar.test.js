/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import NavigationBar from '@Core/components/NavigationBar/NavigationBar';
import { createLocalVue, shallowMount } from '@vue/test-utils';

const localVue = createLocalVue();
describe('NavigationBar', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(NavigationBar, {
            localVue,
        });
    });

    it('Component is named well', () => {
        expect(typeof NavigationBar.name).toBe('string');
        expect(NavigationBar.name).toEqual('NavigationBar');
    });

    it('Has no items', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
