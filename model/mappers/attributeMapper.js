/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    isObject, getKeyByValue,
} from '~/model/objectWrapper';
import { getParamsKeyForType, getParamsOptionsForType } from '~/model/attributes/AttributeTypes';
import { UNASSIGNED_GROUP_ID } from '~/defaults/list';

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

export function getMappedGroupsElementsCount(elements) {
    const groupsElementsCount = {};
    const { length } = elements;

    for (let i = 0; i < length; i += 1) {
        const { groups } = elements[i];
        const { length: groupsCount } = groups;

        if (groupsCount === 0) {
            if (typeof groupsElementsCount[UNASSIGNED_GROUP_ID] === 'undefined') {
                groupsElementsCount[UNASSIGNED_GROUP_ID] = 1;
            } else {
                groupsElementsCount[UNASSIGNED_GROUP_ID] += 1;
            }
        } else {
            for (let j = 0; j < groupsCount; j += 1) {
                if (typeof groupsElementsCount[groups[j]] === 'undefined') {
                    groupsElementsCount[groups[j]] = 1;
                } else {
                    groupsElementsCount[groups[j]] += 1;
                }
            }
        }
    }

    return groupsElementsCount;
}

export function getMappedOptions(options) {
    return options.reduce((acc, current) => {
        const newObject = acc;
        newObject[current.key] = current.value;
        return newObject;
    }, {});
}

export function getParsedOptions(options) {
    return Object.keys(options).map((key) => ({
        key,
        value: options[key],
    }));
}
