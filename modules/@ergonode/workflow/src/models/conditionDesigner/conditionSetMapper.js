/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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

        parsedConditions[id] = {
            type,
        };

        const condition = conditions[type];

        condition.parameters.forEach((parameter) => {
            let value = '';

            if (values[id]) {
                value = values[id][parameter.name];

                if (Array.isArray(value)) {
                    value = value.map(conditionValue => conditionValue.id);
                } else if (typeof value === 'object' && value !== null) {
                    value = value.id;
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

export function getMappedInitialTypeConditionValues({
    parameters,
    value,
}) {
    const mappedCondition = {};

    for (let i = 0; i < parameters.length; i += 1) {
        const {
            name,
            options,
            affectedBy,
            complexOptions,
        } = parameters[i];

        if (value[name]) {
            mappedCondition[name] = value[name];

            if (Array.isArray(value[name])) {
                mappedCondition[name] = value[name].map(option => ({
                    id: option,
                    key: option,
                    value: complexOptions && affectedBy
                        ? complexOptions[value[affectedBy]][option]
                        : options[option],
                }));
            } else if (options || complexOptions) {
                mappedCondition[name] = {
                    id: value[name],
                    key: value[name],
                    value: complexOptions && affectedBy
                        ? complexOptions[value[affectedBy]][value[name]]
                        : options[value[name]],
                };
            }
        }
    }

    return mappedCondition;
}

export function getMappedInitialTypeConditionsValues({
    tree,
    type,
    parameters,
    values,
}) {
    const mappedConditions = {};

    tree.forEach((node) => {
        if (values[node.id] && values[node.id].__initial && node.type === type) {
            mappedConditions[node.id] = getMappedInitialTypeConditionValues({
                parameters,
                value: values[node.id],
            });
        }
    });

    return mappedConditions;
}

export function getMappedTree({
    conditions,
}) {
    const mappedTree = [];

    for (let i = 0; i < conditions.length; i += 1) {
        const id = getUUID();

        mappedTree.push({
            id,
            type: conditions[i].type,
            row: i,
            column: 0,
            parent: null,
        });
    }

    return mappedTree;
}

export function getMappedInitialConditionsValues({
    tree,
    conditions,
}) {
    const conditionsValues = {};

    for (let i = 0; i < tree.length; i += 1) {
        const condition = conditions[i];
        const node = tree[i];

        conditionsValues[node.id] = {
            ...condition,
            __initial: true,
        };
    }

    return conditionsValues;
}
