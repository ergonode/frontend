/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const SKU_MODEL_ID = 'SKU';

export const OPTION_STATES = {
    ADD: 'ADD',
    MOVE: 'MOVE',
    DELETE: 'DELETE',
    EDIT: 'EDIT',
};

export const SKU_MODEL = {
    id: SKU_MODEL_ID,
    code: SKU_MODEL_ID,
    label: SKU_MODEL_ID,
};

export const TYPES = {
    TEXT: 'TEXT',
    TEXT_AREA: 'TEXT_AREA',
    NUMERIC: 'NUMERIC',
    SELECT: 'SELECT',
    MULTI_SELECT: 'MULTI_SELECT',
    PRICE: 'PRICE',
    UNIT: 'UNIT',
    DATE: 'DATE',
    LABEL: 'LABEL',
};

export const SYSTEM_TYPES = {
    SECTION: 'SECTION',
};

export const SCOPE = {
    GLOBAL: 'global',
    LOCAL: 'local',
};

export const DRAGGED_ELEMENT = {
    RELATION_ATTRIBUTE: 'RELATION_ATTRIBUTE',
};

export const ATTRIBUTE_GROUP_CREATED_EVENT_NAME = 'attribute-group-created';

export const ATTRIBUTE_CREATED_EVENT_NAME = 'attribute-created';
