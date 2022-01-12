/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    getDisabledElement,
    getDisabledElements,
} from '@Core/models/mappers/sideBarDataMapper';

describe('sideBarDataMapper/getDisabledElements', () => {
    it('Should return disabled elements', () => {
        const elements = [
            {
                attributeId: 123,
                language: 'en_GB',
            },
            {
                element_id: 111,
            },
            {
                attributeId: 332,
                language: 'en_GB',
            },
            {
                attributeId: 31221,
                language: 'en_GB',
            },
            {
                element_id: 31221,
                language: 'en_GB',
            },
            {
                language: 'en_GB',
            },
        ];
        const result = {
            en_GB: {
                123: false,
                332: false,
                31221: true,
            },
            pl_PL: {
                111: false,
            },
        };

        expect(getDisabledElements({
            elements,
            defaultLanguageCode: 'pl_PL',
        })).toStrictEqual(result);
    });
});

describe('sideBarDataMapper/getDisabledElement', () => {
    it('Should return not disabled element', () => {
        const result = {
            languageCode: 'en_GB',
            elementId: '123',
            disabled: false,
        };

        expect(getDisabledElement({
            languageCode: 'en_GB',
            elementId: '123',
            disabledElements: {},
        })).toStrictEqual(result);
    });

    it('Should return disabled element', () => {
        const disabledElements = {
            en_GB: {
                123: false,
            },
        };
        const result = {
            languageCode: 'en_GB',
            elementId: '123',
            disabled: true,
        };

        expect(getDisabledElement({
            languageCode: 'en_GB',
            elementId: '123',
            disabledElements,
        })).toStrictEqual(result);
    });
});
