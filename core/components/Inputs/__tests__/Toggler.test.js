/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { shallowMount } from '@vue/test-utils';
import Toggler from '~/core/components/Inputs/Toggler/Toggler';

describe('Inputs/Toggler/Toggler', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Toggler);
    });

    it('Component is named well', () => {
        expect(typeof Toggler.name).toBe('string');
        expect(Toggler.name).toEqual('Toggler');
        expect(wrapper).toMatchSnapshot();
    });
});
