/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export function getMappedObjectOption({
    option,
    languageCode,
}) {
    const isLabel = option.label && option.label.length > 0;

    let value = `#${option.code}`;
    let hint = `#${option.code} ${languageCode}`;

    if (isLabel) {
        value = option.label;
        hint = '';
    }

    return {
        id: option.id,
        key: option.code || option.id,
        value,
        hint,
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
