/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const ROW_INTERVALS = [
    25,
    50,
    100,
    200,
];

export const GRID_ACTION = {
    EDIT: 'edit',
    GET: 'get',
    DELETE: 'delete',
};

export const COLUMN_WIDTH = {
    SELECT_ROW: '32px',
    ACTION: 'max-content',
    DEFAULT: 'minmax(150px, 1fr)',
    DYNAMIC: '1fr',
    GHOST: 'min-content',
};

export const PINNED_COLUMN_STATE = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
};

export const ROW_HEIGHT = {
    SMALL: 32,
    MEDIUM: 40,
    LARGE: 80,
};

export const IMAGE_SCALING = {
    FIT_TO_SIZE: {
        value: 'contain',
        description: 'Fit to size',
    },
    FILL_CONTAINER: {
        value: 'cover',
        description: 'Fill container',
    },
};

export const COLUMNS_NUMBER = {
    TWO_COLUMNS: {
        value: 2,
        description: '2 columns',
    },
    THREE_COLUMNS: {
        value: 3,
        description: '3 columns',
    },
    FOURTH_COLUMNS: {
        value: 4,
        description: '4 columns',
    },
    FIVE_COLUMNS: {
        value: 5,
        description: '5 columns',
    },
    SIX_COLUMNS: {
        value: 6,
        description: '6 columns',
    },
};

export const GRID_LAYOUT = {
    TABLE: 'TABLE',
    COLLECTION: 'COLLECTION',
};

export const DRAGGED_ELEMENT = {
    COLUMN: 'COLUMN',
    FILTER: 'FILTER',
    TEMPLATE: 'TEMPLATE',
    LIST: 'LIST',
};

export const DATA_LIMIT = 25;

export const DEFAULT_GRID_FETCH_PARAMS = {
    offset: 0,
    limit: DATA_LIMIT,
    filter: {},
    sortedColumn: {},
};
