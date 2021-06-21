/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const transitions = [
    {
        source: 0,
        destination: 2,
    },
    {
        source: 0,
        destination: 3,
    },
    {
        source: 0,
        destination: 1,
    },
];
export const transitionsToSend = [
    {
        source: '0',
        destination: '2',
        roles: [],
        condition_set: null,
    },
    {
        source: '0',
        destination: '3',
        roles: [],
        condition_set: null,
    },
    {
        source: '0',
        destination: '1',
        roles: [],
        condition_set: null,
    },
];
export const statuses = [
    {
        id: 0,
    },
    {
        id: 1,
    },
    {
        id: 2,
    },
    {
        id: 3,
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
