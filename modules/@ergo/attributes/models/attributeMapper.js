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
            key: current.key,
            value: current.value,
        };
        return newObject;
    }, {});
}

export function getParsedOptions(options) {
    return Object.keys(options).map(key => ({
        key: options[key].key,
        value: options[key].value,
    }));
}
