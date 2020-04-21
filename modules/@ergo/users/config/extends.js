/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { COLUMN_WIDTH } from '@Core/defaults/grid';
import { Components } from './imports';

export default {
    dictionaries: [
        {
            stateProp: 'privileges',
            dataFormat: {},
            requestPath: '/dictionary/privileges',
        },
    ],
    extendComponents: {
        GRID: {
            layout: {
                table: {
                    cells: {
                        data: [
                            {
                                type: 'PRIVILEGE_NAME',
                                component: Components.GridPrivilegeNameDataCell,
                            },
                            {
                                type: 'PRIVILEGE_CHECK',
                                component: Components.GridPrivilegeCheckDataCell,
                            },
                        ],
                    },
                    columns: [
                        {
                            type: 'PRIVILEGE_CHECK',
                            width: COLUMN_WIDTH.DYNAMIC,
                            component: Components.GridPrivilegeCheckColumn,
                        },
                        {
                            type: 'PRIVILEGE_SELECT_ROW',
                            width: COLUMN_WIDTH.SELECT_ROW,
                            component: Components.GridPrivilegeSelectRowColumn,
                        },
                        {
                            type: 'PRIVILEGE_NAME',
                            width: COLUMN_WIDTH.DYNAMIC,
                            component: Components.GridPrivilegeNameColumn,
                        },
                    ],
                },
            },
        },
    },
};
