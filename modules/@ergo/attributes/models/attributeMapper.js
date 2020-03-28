/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    isObject, getKeyByValue,
} from '@Core/models/objectWrapper';
import { getParamsKeyForType, getParamsOptionsForType } from '@Attributes/models/attributeTypes';

export function getParsedType(types, selectedType) {
    return getKeyByValue(types, selectedType);
}

export function getMappedParameterValues(type, parameters, data) {
    const typeParameters = getParamsOptionsForType(
        type,
        data,
    );
    const [parsedParameters] = Object.values(parameters);

    // TODO:(DICTIONARY_TYPE) remove condition when dictionary data consistency
    if (Array.isArray(typeParameters)) {
        return typeParameters.find(option => option.id === parsedParameters).name;
    }

    return typeParameters[parsedParameters];
}

export function getParsedParameterKeys({
    selectedType,
    selectedParam,
}) {
    const paramKey = getParamsKeyForType(selectedType);

    if (isObject(selectedParam)) {
        return { [paramKey]: Object.keys(selectedParam) };
    }

    return { [paramKey]: selectedParam };
}

export function getMappedOptions(options) {
    return options.reduce((acc, current, currentIndex) => {
        const newObject = acc;
        newObject[currentIndex] = {
            id: current.id,
            key: current.code,
            value: current.label,
        };
        return newObject;
    }, {});
}

export function getParsedOptions(options) {
    return Object.keys(options).map(key => ({
        code: options[key].key,
        label: options[key].value,
    }));
}
