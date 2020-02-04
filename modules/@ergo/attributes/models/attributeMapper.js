/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    isObject, getKeyByValue,
} from '@Core/models/objectWrapper';
import { getParamsKeyForType, getParamsOptionsForType } from '@Attributes/models/attributeTypes';
import { UNASSIGNED_GROUP_ID } from '@Core/defaults/list';

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
