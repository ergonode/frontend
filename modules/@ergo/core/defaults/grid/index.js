/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const GHOST_ID = 'GHOST';
export const COLUMN_SELECT_ROW_ID = 'COLUMN_SELECT_ROW';
export const COLUMN_ACTIONS_ID = 'COLUMN_ACTIONS';

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
    FIT_TO_SIZE: { value: 'cover', description: 'Fit to size' },
    FILL_CONTAINER: { value: 'fill', description: 'Fill container' },
};

export const COLUMNS_NUMBER = {
    TWO_COLUMNS: { value: 2, description: '2 columns' },
    THREE_COLUMNS: { value: 3, description: '3 columns' },
    FOURTH_COLUMNS: { value: 4, description: '4 columns' },
    FIVE_COLUMNS: { value: 5, description: '5 columns' },
    SIX_COLUMNS: { value: 6, description: '6 columns' },
};

export const GRID_LAYOUT = {
    TABLE: 'TABLE',
    COLLECTION: 'COLLECTION',
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

export const COLUMN_SELECT_ROW = {
    id: COLUMN_SELECT_ROW_ID,
    type: 'SELECT_ROW',
};

export const COLUMN_ACTIONS = {
    id: COLUMN_ACTIONS_ID,
    type: 'ACTION',
};

export const COLUMN_GHOST = {
    id: GHOST_ID,
    type: GHOST_ID,
};

export const COLUMN_TYPE = {
    ACTION: 'ACTION',
    IMAGE: 'IMAGE',
    LABEL: 'LABEL',
    SELECT: 'SELECT',
    RANGE: 'RANGE',
    TEXT: 'TEXT',
    MULTI_SELECT: 'MULTI_SELECT',
    CHECK: 'CHECK',
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
