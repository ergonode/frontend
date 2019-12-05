/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    isObject, getKeyByValue, getValueByKey,
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

    if (Array.isArray(parsedParameters)) {
        return parsedParameters.reduce((acc, current) => {
            const newObject = acc;
            newObject[current] = getValueByKey(typeParameters, current);
            return newObject;
        }, {});
    }

    return parsedParameters;
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

export function getParsedGroups(groups) {
    return groups.map((group) => group.key);
}

export function getMappedGroups(groupIds, groupOptions) {
    const groups = [];

    groupIds.forEach((id) => {
        const groupOption = groupOptions.find((option) => option.key === id);

        if (groupOption) {
            groups.push(groupOption);
        }
    });

    return groups;
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

export function getMappedOptionKeysValues(options, isMultilingual) {
    const optionKeys = [];
    const optionValues = isMultilingual ? {} : [];

    options.forEach((option) => {
        const { key, value } = option;
        optionKeys.push(key);

        if (isMultilingual) {
            if (!value) return;

            Object.entries(value).forEach(([transKey, transValue]) => {
                if (!optionValues[transKey]) {
                    optionValues[transKey] = [];
                }
                optionValues[transKey].push(transValue);
            });
        } else {
            optionValues.push(value);
        }
    });

    return { optionKeys, optionValues };
}

export function getParsedOptions(optionKeys, optionValues, isMultilingual) {
    const options = [];

    optionKeys.forEach((key, optIndex) => {
        let value = null;

        if (isMultilingual) {
            value = {};
            const optionsEntries = Object.entries(optionValues);
            optionsEntries.forEach(([transKey, transValue]) => {
                // We do not want to send an empty option key values
                if (transValue[optIndex]) {
                    value[transKey] = transValue[optIndex];
                }
            });
        } else {
            value = optionValues[optIndex];
        }

        options.push({
            key,
            value,
        });
    });

    return options;
}
