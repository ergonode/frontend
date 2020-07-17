/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    toCapitalize,
} from '@Core/models/stringWrapper';

export const getCheckColumn = (optionType, isEditable) => ({
    id: optionType,
    label: toCapitalize(optionType),
    type: 'CHECK',
    editable: isEditable,
    visible: true,
});

export const nameColumn = {
    id: 'name',
    label: 'Name',
    type: 'PRIVILEGE_NAME_HINT',
    editable: false,
    visible: true,
};

export const selectRowColumn = {
    id: 'selectRow',
    label: '',
    type: 'PRIVILEGE_ROW_CHECK',
    editable: true,
    visible: true,
};

export const dataStructure = {
    name: 'name',
    description: 'description',
    types: 'privileges',
};

export default {
    getCheckColumn,
    nameColumn,
    selectRowColumn,
    dataStructure,
};
