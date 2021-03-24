/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const apiData = [
    {
        children_id: 'a72bdcce-6bd6-5663-99ae-7bad19307aa6',
        children: [
            {
                children_id: '4c59d19f-e569-576b-a67f-e2d2094b19f5',
                children: [
                    {
                        children_id: 'fb471778-cbe7-56ca-ace7-0edd936092d7',
                        children: [],
                    },
                    {
                        children_id: 'f9e4f5a5-7a87-5efc-a680-cfbdb68b869f',
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        children_id: 'b07154ca-3e19-5d69-9238-8fe2b0c5e49e',
        children: [],
    },
];

export const mappedTree = [
    {
        id: 'a72bdcce-6bd6-5663-99ae-7bad19307aa6',
        code: 'code_1',
        column: 0,
        row: 0,
        label: null,
        parent: null,
    },
    {
        id: '4c59d19f-e569-576b-a67f-e2d2094b19f5',
        code: 'code_2',
        column: 1,
        row: 1,
        label: null,
        parent: 'a72bdcce-6bd6-5663-99ae-7bad19307aa6',
    },
    {
        id: 'fb471778-cbe7-56ca-ace7-0edd936092d7',
        code: 'code_3',
        column: 2,
        row: 2,
        label: null,
        parent: '4c59d19f-e569-576b-a67f-e2d2094b19f5',
    },
    {
        id: 'f9e4f5a5-7a87-5efc-a680-cfbdb68b869f',
        code: 'code_4',
        column: 2,
        row: 3,
        label: null,
        parent: '4c59d19f-e569-576b-a67f-e2d2094b19f5',
    },
    {
        id: 'b07154ca-3e19-5d69-9238-8fe2b0c5e49e',
        code: 'code_5',
        column: 0,
        row: 4,
        label: null,
        parent: null,
    },
];

export const mappedTreeWithoutReducer = [
    {
        id: 'a72bdcce-6bd6-5663-99ae-7bad19307aa6',
        column: 0,
        row: 0,
        parent: null,
    },
    {
        id: '4c59d19f-e569-576b-a67f-e2d2094b19f5',
        column: 1,
        row: 1,
        parent: 'a72bdcce-6bd6-5663-99ae-7bad19307aa6',
    },
    {
        id: 'fb471778-cbe7-56ca-ace7-0edd936092d7',
        column: 2,
        row: 2,
        parent: '4c59d19f-e569-576b-a67f-e2d2094b19f5',
    },
    {
        id: 'f9e4f5a5-7a87-5efc-a680-cfbdb68b869f',
        column: 2,
        row: 3,
        parent: '4c59d19f-e569-576b-a67f-e2d2094b19f5',
    },
    {
        id: 'b07154ca-3e19-5d69-9238-8fe2b0c5e49e',
        column: 0,
        row: 4,
        parent: null,
    },
];

export const dataDetails = [
    {
        id: 'a72bdcce-6bd6-5663-99ae-7bad19307aa6',
        code: 'code_1',
        label: null,
    },
    {
        id: '4c59d19f-e569-576b-a67f-e2d2094b19f5',
        code: 'code_2',
        label: null,
    },
    {
        id: 'fb471778-cbe7-56ca-ace7-0edd936092d7',
        code: 'code_3',
        label: null,
    },
    {
        id: 'f9e4f5a5-7a87-5efc-a680-cfbdb68b869f',
        code: 'code_4',
        label: null,
    },
    {
        id: 'b07154ca-3e19-5d69-9238-8fe2b0c5e49e',
        code: 'code_5',
        label: null,
    },
];

export const reducer = (id) => {
    const {
        code,
        label,
    } = dataDetails.find(data => data.id === id);

    return {
        code,
        label,
    };
};
