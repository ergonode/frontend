/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const value = [
    {
        id: 1,
        label: 'Furniture',
    },
    {
        id: 2,
        label: 'Wardrobe',
    },
    {
        id: 3,
        label: 'Pull-out wardrobe',
    },
];

export const selectedValue = {
    1: true,
    2: true,
    3: true,
};

export const tree = [
    {
        id: 1,
        label: 'Furniture',
        children: [
            {
                id: 2,
                label: 'Wardrobe',
                children: [
                    {
                        id: 3,
                        label: 'Pull-out wardrobe',
                    },
                ],
            },
        ],
    },
    {
        id: 4,
        label: 'Garden',
        children: [
            {
                id: 5,
                label: 'Table',
            },
        ],
    },
];

export const selectedNodes = {
    1: {
        all: 2,
        selected: 2,
    },
    2: {
        all: 1,
        selected: 1,
    },
    3: {
        all: 0,
        selected: 0,
    },
    4: {
        all: 1,
        selected: 0,
    },
    5: {
        all: 0,
        selected: 0,
    },
};
