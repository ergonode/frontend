/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export function getMappedObjectOption({
    option,
    languageCode,
}) {
    return {
        id: option.id,
        key: option.code,
        value: option.label || '',
        hint: option.label
            ? `#${option.code} ${languageCode}`
            : '',
    };
}

export function getMappedTranslationArrayOptions({
    options,
    languageCode,
}) {
    return options.map(option => getMappedObjectOption({
        option,
        languageCode,
    }));
}

export function getMappedMatchedArrayOptions({
    optionIds,
    options,
    languageCode,
}) {
    return optionIds.map(id => getMappedObjectOption({
        option: {
            id,
            ...options[id],
        },
        languageCode,
    }));
}

export function getMappedObjectOptions({
    options,
    languageCode,
}) {
    return getMappedMatchedArrayOptions({
        optionIds: Object.keys(options),
        options,
        languageCode,
    });
}
