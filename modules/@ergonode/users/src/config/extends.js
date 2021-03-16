/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
} from './imports';

export default {
    dictionaries: [
        {
            stateProp: 'privileges',
            defaultValue: [],
            request: {
                path: '/dictionary/privileges',
                config: {},
            },
            dataMapper: response => response,
        },
    ],
    extendComponents: {
        '@UI/components/Grid/Layout/Table/Cells/Data': {
            PRIVILEGE_NAME_HINT: Components.GridPrivilegeNameHintDataCell,
        },
        '@UI/components/Grid/Layout/Table/Columns': {
            PRIVILEGE_ROW_CHECK: Components.GridPrivilegeRowCheckColumn,
            LANGUAGE_ROW_CHECK: Components.GridLanguageRowCheckColumn,
        },
    },
};
