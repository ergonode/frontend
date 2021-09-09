/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Error500 from '@UI/components/Layout/Errors/500';
import {
    shallowMount,
} from '@vue/test-utils';

describe('Errors/500', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Error500);
    });

    it('Component is named well', () => {
        expect(typeof Error500.name).toBe('string');
        expect(Error500.name).toEqual('Error500');
        expect(wrapper).toMatchSnapshot();
    });
});
