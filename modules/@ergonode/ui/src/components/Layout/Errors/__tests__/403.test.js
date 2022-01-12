/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Error403 from '@UI/components/Layout/Errors/403';
import {
    shallowMount,
} from '@vue/test-utils';

describe('Errors/403', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Error403);
    });

    it('Component is named well', () => {
        expect(typeof Error403.name).toBe('string');
        expect(Error403.name).toEqual('Error403');
        expect(wrapper).toMatchSnapshot();
    });
});
