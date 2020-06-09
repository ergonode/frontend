/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import Toggler from '@Core/components/Inputs/Toggler/Toggler';

describe('Inputs/Toggler/Toggler', () => {
    let wrapper;
    beforeEach(() => {
        // eslint-disable-next-line no-unused-vars
        wrapper = shallowMount(Toggler);
    });

    it('Component is named well', () => {
        expect(typeof Toggler.name).toBe('string');
        expect(Toggler.name).toEqual('Toggler');
    });
});
