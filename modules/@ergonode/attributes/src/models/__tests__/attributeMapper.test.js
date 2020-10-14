/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getParsedType,
} from '../attributeMapper';

describe('attributeMapper/getParsedType', () => {
    describe('Based on attribute types data, data is mapped into API structure', () => {
        it('Getting type object key based on his value', () => {
            const types = {
                TEXT: 'text',
                SELECT: 'select',
            };
            const selectedType = 'text';

            expect(getParsedType(types, selectedType)).toEqual('TEXT');
        });
    });
});
