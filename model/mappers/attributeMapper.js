/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getKeyByValue, getKeysByValues, getValuesByKeys } from '~/model/objectWrapper';
import { getParamsKeyForType, getParamsOptionsForType } from '~/model/attributes/AttributeTypes';

export function getMappedType(types, selectedType) {
    return getKeyByValue(types, selectedType);
}

export function getMappedParameterKey(types, selectedType) {
    const typeKey = getMappedType(types, selectedType);
    return getParamsKeyForType(typeKey);
}

export function getMappedParameterValues(type, parameters, data) {
    const typeParameters = getParamsOptionsForType(
        type,
        data,
    );
    const [parsedParameters] = Object.values(parameters);

    if (Array.isArray(parsedParameters)) {
        return getValuesByKeys(typeParameters, parsedParameters);
    }

    return typeParameters[parsedParameters];
}

export function getMappedParameterKeys(
    types,
    selectedType,
    selectedParam,
    data,
) {
    const typeKey = getMappedType(types, selectedType);
    const paramKey = getParamsKeyForType(typeKey);
    const typeParameters = getParamsOptionsForType(
        typeKey,
        data,
    );

    if (Array.isArray(selectedParam)) {
        return { [paramKey]: getKeysByValues(typeParameters, selectedParam) };
    }

    return { [paramKey]: getKeyByValue(typeParameters, selectedParam) };
}

export function getMappedGroupIDs(groups, selectedGroups) {
    const mappedGroups = [];

    groups.forEach((group) => {
        if (selectedGroups.some(grp => grp === group.label)) {
            mappedGroups.push(group.id);
        }
    });

    return mappedGroups;
}

export function getMappedGroupLabels(groups, selectedGroups) {
    const mappedGroups = [];

    groups.forEach((group) => {
        if (selectedGroups.some(grp => grp === group.id)) {
            mappedGroups.push(group.label);
        }
    });

    return mappedGroups;
}

export function getMappedOptionKeysValues(options) {
    const optionKeys = [];
    const optionTranslations = {};
    options.forEach((option) => {
        const { key, translation } = option;
        optionKeys.push(key);
        Object.entries(translation).forEach(([transKey, transValue]) => {
            if (optionTranslations[transKey]) {
                optionTranslations[transKey].push(transValue);
            } else {
                optionTranslations[transKey] = [];
                optionTranslations[transKey].push(transValue);
            }
        });
    });

    return { optionKeys, optionTranslations };
}

export function getMappedOptions(optionKeys, optionTranslations) {
    const options = [];

    optionKeys.forEach((key, optIndex) => {
        const translation = {};

        Object.entries(optionTranslations).forEach(([transKey, transValue]) => {
            // We do not want to send an empty option key values
            if (transValue[optIndex]) {
                translation[transKey] = transValue[optIndex];
            }
        });

        options.push({
            key,
            translation,
        });
    });

    return options;
}
