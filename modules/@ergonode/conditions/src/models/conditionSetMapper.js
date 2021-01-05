/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getUUID,
} from '@Core/models/stringWrapper';

export function getParsedConditions({
    values,
    conditions,
    tree,
}) {
    const parsedConditions = {};

    tree.forEach((node) => {
        const {
            id,
            type,
        } = node;

        if (typeof parsedConditions[id] === 'undefined') {
            parsedConditions[id] = {
                type,
            };
        }

        const condition = conditions[type];

        condition.parameters.forEach((parameter) => {
            let value = '';

            if (values[id]) {
                value = values[id][parameter.name];

                if (typeof values[id][parameter.name] === 'object') {
                    value = values[id][parameter.name].id;
                } else if (Array.isArray(values[id][parameter.name])) {
                    value = values[id][parameter.name].map(conditionValue => conditionValue.id);
                }
            }

            parsedConditions[id][parameter.name] = value;
        });
    });

    return Object.keys(parsedConditions).reduce((prev, curr) => [
        ...prev,
        parsedConditions[curr],
    ], []);
}

export function getMappedCondition({
    parameters,
    node,
}) {
    const mappedCondition = {};

    for (let i = 0; i < parameters.length; i += 1) {
        const {
            name,
            options,
            affectedBy,
            complexOptions,
        } = parameters[i];

        if (node[name]) {
            mappedCondition[name] = node[name];

            if (options || complexOptions) {
                const value = complexOptions && affectedBy
                    ? complexOptions[node[affectedBy]][node[name]]
                    : options[node[name]];

                mappedCondition[name] = {
                    id: node[name],
                    key: node[name],
                    value,
                };
            } else if (Array.isArray(node[name])) {
                mappedCondition[name] = node[name].map((option) => {
                    const value = complexOptions && affectedBy
                        ? complexOptions[node[affectedBy]][option]
                        : options[option];

                    return {
                        id: option,
                        key: option,
                        value,
                    };
                });
            }
        }
    }

    return mappedCondition;
}

export function getMappedTree(conditions) {
    const mappedTree = [];
    const values = {};

    for (let i = 0; i < conditions.length; i += 1) {
        const id = getUUID();

        values[id] = {};
        mappedTree.push({
            ...conditions[i],
            id,
            row: i,
            column: 0,
            parent: null,
        });
    }
    return {
        tree: mappedTree,
        values,
    };
}
