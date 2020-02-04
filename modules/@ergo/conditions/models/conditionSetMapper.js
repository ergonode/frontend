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

            if (parameter && parameter.options) {
                conditionData[conditionKey] = conditionData[conditionKey].id;
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
            const { options } = conditionsData[type].parameters.find(param => param.name === key);

            if (options) {
                parameters[key] = {
                    id: parameters[key],
                    key: parameters[key],
                    value: options[parameters[key]],
                };
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
