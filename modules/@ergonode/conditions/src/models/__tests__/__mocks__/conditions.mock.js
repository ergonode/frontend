/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const conditionsTree = [
    {
        id: 'NUMERIC_ATTRIBUTE_VALUE_CONDITION--fojkn1i86',
        code: null,
        name: 'NUMERIC_ATTRIBUTE_VALUE_CONDITION',
        row: 0,
        column: 0,
        parent: null,
        children: 0,
        expanded: false,
    },
    {
        id: 'ATTRIBUTE_EXISTS_CONDITION--ifsuvg9u6',
        code: null,
        name: 'ATTRIBUTE_EXISTS_CONDITION',
        row: 1,
        column: 0,
        parent: null,
        children: 0,
        expanded: false,
    },
];

export const conditionValues = {
    'NUMERIC_ATTRIBUTE_VALUE_CONDITION--fojkn1i86': {
        attribute: '38ea0370-5b8b-5eed-a028-02da8c6e6c44',
        operator: '<>',
        value: 'test',
    },
    'ATTRIBUTE_EXISTS_CONDITION--ifsuvg9u6': {
        attribute: 'fbc4c669-eb9b-5af0-b6d0-d6ca5157c109',
    },
};

export const mappedData = [
    {
        type: 'NUMERIC_ATTRIBUTE_VALUE_CONDITION',
        attribute: '38ea0370-5b8b-5eed-a028-02da8c6e6c44',
        operator: '<>',
        value: 'test',
    },
    {
        type: 'ATTRIBUTE_EXISTS_CONDITION',
        attribute: 'fbc4c669-eb9b-5af0-b6d0-d6ca5157c109',
    },
];
