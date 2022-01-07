/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Error404 from '@UI/components/Layout/Errors/404';
import {
    shallowMount,
} from '@vue/test-utils';

describe('Errors/404', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Error404, {
            stubs: {
                Placeholder: true,
                Button: true,
            },
        });
    });

    it('Component is named well', () => {
        expect(typeof Error404.name).toBe('string');
        expect(Error404.name).toEqual('Error404');
        expect(wrapper).toMatchSnapshot();
    });
});
