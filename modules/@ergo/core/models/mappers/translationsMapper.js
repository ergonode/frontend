/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { isObject } from '@Core/models/objectWrapper';

export function isThereAnyTranslation(translation) {
    if (!isObject(translation) && typeof translation !== 'string') return false;
    if (!isObject(translation)) {
        return translation !== '';
    }
    return !!Object.keys(translation).find((key) => translation[key] !== '');
}

export function getParsedTranslations(translation) {
    if (!isObject(translation)) return translation;
    return Object.keys(translation).reduce((response, property) => {
        if (translation[property] !== '') {
            return { ...response, [property]: translation[property] };
        }
        return { ...response };
    }, {});
}
