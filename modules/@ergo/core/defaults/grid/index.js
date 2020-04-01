/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const GHOST_ID = 'ghost';

export const GHOST_ELEMENT_MODEL = {
    id: GHOST_ID,
};

export const ROW_INTERVALS = [
    25, 50, 100, 200,
];

export const COLUMN_WIDTH = {
    SELECT_ROW: '40px',
    ACTION: 'max-content',
    DEFAULT: 'minmax(150px, 1fr)',
    GHOST: '100px',
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

export const GRID_LAYOUT = {
    TABLE: 'TABLE',
    GRID: 'GRID',
};

export const GRID_HEADER_TYPE = {
    CHECK: 'CHECK',
    PLAIN: 'PLAIN',
    INTERACTIVE: 'INTERACTIVE',
};

export const DRAGGED_ELEMENT = {
    COLUMN: 'COLUMN',
    FILTER: 'FILTER',
    TEMPLATE: 'TEMPLATE',
};

export const COLUMN_TYPE = {
    CHECK: 'CHECK',
    ACTION: 'ACTION',
    IMAGE: 'IMAGE',
    LABEL: 'LABEL',
    SELECT: 'SELECT',
    RANGE: 'RANGE',
    TEXT: 'TEXT',
    MULTI_SELECT: 'MULTI_SELECT',
    CHECK_CELL: 'CHECK_CELL',
};

export const COLUMN_FILTER_TYPE = {
    CHECK: 'CHECK',
    DATE: 'DATE',
    RANGE: 'RANGE',
    TEXT: 'TEXT',
    NUMERIC: 'NUMERIC',
    SELECT: 'SELECT',
    MULTI_SELECT: 'MULTI_SELECT',
};

export const DATA_LIMIT = 25;
