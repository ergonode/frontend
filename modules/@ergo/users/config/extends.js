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
        // TODO:
        // {
        //     stateProp: 'languageRestrictions',
        //     dataFormat: {},
        //     requestPath: '/dictionary/languageRestrictions',
        // },
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
                            type: 'ELEMENT_NAME',
                            width: COLUMN_WIDTH.DYNAMIC,
                            component: Components.GridElementNameColumn,
                        },
                        {
                            type: 'LANGUAGE_RESTRICTIONS',
                            width: COLUMN_WIDTH.DYNAMIC,
                            component: Components.GridLanguageRestrictionsColumn,
                        },
                        {
                            type: 'LANGUAGE_SELECT_ROW',
                            width: COLUMN_WIDTH.SELECT_ROW,
                            component: Components.GridLanguageSelectRowColumn,
                        },
                    ],
                },
            },
        },
    },
};
