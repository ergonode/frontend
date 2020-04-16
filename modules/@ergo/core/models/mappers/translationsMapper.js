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
    return !!Object.keys(translation).find(key => translation[key] !== '');
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

export function getMappedObjectOption({ option, languageCode }) {
    return {
        id: option.id,
        key: option.code,
        value: option.label,
        hint: option.label
            ? `#${option.code} ${languageCode}`
            : '',
    };
}

export function getMappedArrayOptions({ options, languageCode }) {
    return options.map(option => getMappedObjectOption({ option, languageCode }));
}

export function getMappedMatchedArrayOptions({ optionIds, options, languageCode }) {
    return optionIds.map(id => getMappedObjectOption({
        option: {
            id, ...options[id],
        },
        languageCode,
    }));
}

export function getMappedObjectOptions({ options, languageCode }) {
    return getMappedMatchedArrayOptions({
        optionIds: Object.keys(options),
        options,
        languageCode,
    });
}
