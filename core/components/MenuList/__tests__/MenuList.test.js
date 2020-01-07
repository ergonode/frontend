/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import MenuList from '~/core/components/MenuList/MenuList';


describe('Navigation/MenuList', () => {
    it('Component is named well', () => {
        expect(typeof MenuList.name).toBe('string');
        expect(MenuList.name).toEqual('MenuList');
    });
});
