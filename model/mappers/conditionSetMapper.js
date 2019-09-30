/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getUUID } from '~/model/stringWrapper';

export function getMappedConditionSetData(treeStructure, conditionSetData) {
    const mappedData = [];
    for (let i = 0; i < treeStructure.length; i += 1) {
        const { id } = treeStructure[i];
        const [correctId] = id.split('--');
        const conditionData = conditionSetData[id];

        mappedData.push({
            type: correctId,
            ...conditionData,
        });
    }
    return mappedData;
}

export function getParsedConditionSetData(conditions) {
    const parsedData = { conditionsData: {}, conditionsTree: [] };
    for (let i = 0; i < conditions.length; i += 1) {
        const { type, ...parameters } = conditions[i];
        const uniqId = `${type}--${getUUID()}`;

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
