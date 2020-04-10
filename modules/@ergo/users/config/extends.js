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
                    columns: [
                        {
                            type: 'PRIVILEGE',
                            width: COLUMN_WIDTH.DYNAMIC,
                            component: Components.GridPrivilegeColumn,
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
