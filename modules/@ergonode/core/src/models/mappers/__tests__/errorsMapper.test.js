/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    dutchCode,
    englishCode,
    fieldKeys,
    languageErrors,
    mappedEnglishLanguageErrors,
    mappedGermanLanguageErrors,
    mappedMixedFormErrors,
    mappedMixedFormWithFieldKeysErrors,
    mappedNestedFormErrors,
    mappedNestedFormWithFieldKeysErrors,
    mappedPolishLanguageErrors,
    mappedSimpleFormErrors,
    mappedSimpleFormWithFieldKeysAndScopeErrors,
    mappedSimpleFormWithFieldKeysErrors,
    mixedErrorStructure,
    nestedFormErrors,
    polishCode,
    scope,
    simpleFormErrors,
} from '@Core/models/mappers/__tests__/__mocks__';
import {
    getMappedErrors,
    getMappedScopedErrors,
    getMappedTranslationErrors,
} from '@Core/models/mappers/errorsMapper';

describe('errorsMapper/getMappedErrors', () => {
    describe('Simple errors', () => {
        it('Non custom fields are not defined', () => {
            const result = getMappedErrors({
                errors: simpleFormErrors,
            });

            expect(result).toStrictEqual(mappedSimpleFormErrors);
        });

        it('Custom fields are defined', () => {
            const result = getMappedErrors({
                errors: simpleFormErrors,
                fieldKeys,
            });

            expect(result).toStrictEqual(mappedSimpleFormWithFieldKeysErrors);
        });
    });

    describe('Nested errors', () => {
        it('Non custom fields are not defined', () => {
            const result = getMappedErrors({
                errors: nestedFormErrors,
            });

            expect(result).toStrictEqual(mappedNestedFormErrors);
        });

        it('Custom fields are defined', () => {
            const result = getMappedErrors({
                errors: nestedFormErrors,
                fieldKeys,
            });

            expect(result).toStrictEqual(mappedNestedFormWithFieldKeysErrors);
        });
    });

    describe('Mixed errors structure', () => {
        it('Non custom fields are not defined', () => {
            const result = getMappedErrors({
                errors: mixedErrorStructure,
            });

            expect(result).toStrictEqual(mappedMixedFormErrors);
        });

        it('Custom fields are defined', () => {
            const result = getMappedErrors({
                errors: mixedErrorStructure,
                fieldKeys,
            });

            expect(result).toStrictEqual(mappedMixedFormWithFieldKeysErrors);
        });
    });
});

describe('errorsMapper/getMappedScopedErrors', () => {
    it('Add scope to mapped errors', () => {
        const result = getMappedScopedErrors({
            scope,
            errors: simpleFormErrors,
            fieldKeys,
        });

        expect(result).toStrictEqual(mappedSimpleFormWithFieldKeysAndScopeErrors);
    });
});

describe('errorsMapper/getMappedTranslationErrors', () => {
    it('Get errors for english code', () => {
        const result = getMappedTranslationErrors({
            errors: languageErrors,
            languageCode: englishCode,
        });

        expect(result).toStrictEqual(mappedEnglishLanguageErrors);
    });

    it('Get errors for polish code', () => {
        const result = getMappedTranslationErrors({
            errors: languageErrors,
            languageCode: polishCode,
        });

        expect(result).toStrictEqual(mappedPolishLanguageErrors);
    });

    it('No errors for given translation code', () => {
        const result = getMappedTranslationErrors({
            errors: languageErrors,
            languageCode: dutchCode,
        });

        expect(result).toStrictEqual(mappedGermanLanguageErrors);
    });
});
