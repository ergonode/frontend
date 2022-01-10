/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const transitions = [
    {
        from: '0',
        to: '2',
        roles: [],
    },
    {
        from: '0',
        to: '3',
        roles: [],
    },
    {
        from: '0',
        to: '1',
        roles: [],
    },
];

export const transitionsToSend = [
    {
        from: '0',
        to: '2',
        roles: [],
    },
    {
        from: '0',
        to: '3',
        roles: [],
    },
    {
        from: '0',
        to: '1',
        roles: [],
    },
];

export const statuses = [
    {
        id: '0',
    },
    {
        id: '1',
    },
    {
        id: '2',
    },
    {
        id: '3',
    },
];

export const extendedStatuses = [
    {
        id: '0',
    },
    {
        id: '1',
    },
    {
        id: '1111',
    },
    {
        id: '2',
    },
    {
        id: '3',
    },
];

export const extendedLayoutElements = [
    {
        id: '0--2',
        from: 0,
        to: 3,
        row: 0,
    },
    {
        id: '0--3',
        from: 0,
        to: 4,
        row: 1,
    },
    {
        id: '0--1',
        from: 0,
        to: 1,
        row: 2,
    },
];

export const layoutElements = [
    {
        id: '0--2',
        from: 0,
        to: 2,
        row: 0,
    },
    {
        id: '0--3',
        from: 0,
        to: 3,
        row: 1,
    },
    {
        id: '0--1',
        from: 0,
        to: 1,
        row: 2,
    },
];

export const obstacleColumns = [
    0,
    2,
    3,
    1,
];

export const validColumns = [
    0,
    1,
    2,
    3,
];

export const validRowPositions = {
    '0--2': 0,
    '0--3': 1,
    '0--1': 2,
};

export const validRow = [
    0,
    1,
    2,
];
