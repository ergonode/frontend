/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
} from './imports';

export default {
    dictionaries: [
        {
            stateProp: 'privileges',
            dataFormat: {},
            requestPath: '/dictionary/privileges',
        },
    ],
    extendComponents: {
        '@Core/components/Grid/Layout/Table/Cells/Data': {
            PRIVILEGE_NAME_HINT: Components.GridPrivilegeNameHintDataCell,
        },
        '@Core/components/Grid/Layout/Table/Columns': {
            PRIVILEGE_ROW_CHECK: Components.GridPrivilegeRowCheckColumn,
            LANGUAGE_ROW_CHECK: Components.GridLanguageRowCheckColumn,
        },
    },
};
