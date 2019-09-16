/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getParsedData, getLanguageCodesBasedOnNames } from '~/model/mappers/languageMapper';

describe('getParsedData/languageMapper', () => {
    it('Based on languages active in application and selected language codes in settings get data for API call',  () => {
        const activeLanguages = {
            EN: 'English',
            PL: 'Polski',
        };
        const selectedLanguageCodes = ['EN', 'UK'];
        const result = getParsedData(activeLanguages, selectedLanguageCodes);

        expect(result).toStrictEqual({
            collection: [
                {
                    code: 'UK',
                    active: true,
                },
                {
                    code: 'PL',
                    active: false,
                }
            ]
        })
    });
});

describe('getLanguageCodesBasedOnNames/languageMapper', () => {
    it('Based on language names (Descriptions i.e. English), get language Codes i.e. EN', () => {
        const languageNames = ['English', 'Polski', 'German'];
        const languages = [
            {
                code: 'EN',
                name: 'English',
            },
            {
                code: 'PL',
                name: 'Polski',
            },
        ];
        const result = getLanguageCodesBasedOnNames(languageNames, languages);

        expect(result).toStrictEqual(['EN', 'PL']);
    });
});
