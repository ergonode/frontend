/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getUUID } from '@Core/models/stringWrapper';

export function getMappedConditionSetData(conditionSetData, conditions) {
    const mappedData = [];

    Object.keys(conditionSetData).forEach((key) => {
        const [conditionId] = key.split('--');
        const conditionData = { ...conditionSetData[key] };
        const { parameters } = conditions[conditionId];

        Object.keys(conditionData).forEach((conditionKey) => {
            const parameter = parameters.find(({ name }) => name === conditionKey);

            if (parameter && (parameter.options || parameter.complexOptions)) {
                if (Array.isArray(conditionData[conditionKey])) {
                    conditionData[conditionKey] = conditionData[conditionKey].map(
                        option => option.id,
                    );
                } else {
                    conditionData[conditionKey] = conditionData[conditionKey].id;
                }
            }
        });

        mappedData.push({
            type: conditionId,
            ...conditionData,
        });
    });

    return mappedData;
}

export function getParsedConditionSetData(conditions, conditionsData) {
    const parsedData = { conditionsData: {}, conditionsTree: [] };

    for (let i = 0; i < conditions.length; i += 1) {
        const { type, ...parameters } = conditions[i];
        const uniqId = `${type}--${getUUID()}`;


        Object.keys(parameters).forEach((key) => {
            const {
                options,
                complexOptions = null,
                affectedBy = null,
            } = conditionsData[type].parameters.find(param => param.name === key);

            if (affectedBy && complexOptions) {
                const affectedByOptionId = conditions[i][affectedBy];

                parameters[key] = {
                    id: parameters[key],
                    key: parameters[key],
                    value: complexOptions[affectedByOptionId][parameters[key]],
                };
            }
            if (options) {
                if (Array.isArray(parameters[key])) {
                    parameters[key] = parameters[key].map(option => ({
                        id: option,
                        key: option,
                        value: options[option],
                    }));
                } else {
                    parameters[key] = {
                        id: parameters[key],
                        key: parameters[key],
                        value: options[parameters[key]],
                    };
                }
            }
        });

        parsedData.conditionsData[uniqId] = parameters;
        parsedData.conditionsTree.push({
            id: uniqId,
            code: null,
            name: type,
            row: i,
            column: 0,
            parent: 'root',
            children: 0,
            expanded: false,
        });
    }
    return parsedData;
}
