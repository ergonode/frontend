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
                    cells: {
                        data: [
                            {
                                type: 'PRIVILEGE_CHECK',
                                component: Components.GridCheckDataCell,
                            },
                            {
                                type: 'LANGUAGE_CHECK',
                                component: Components.GridCheckDataCell,
                            },
                            {
                                type: 'ROW_NAME',
                                component: Components.GridRowNameDataCell,
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
                            type: 'LANGUAGE_CHECK',
                            width: COLUMN_WIDTH.DYNAMIC,
                            component: Components.GridLanguageCheckColumn,
                        },
                        {
                            type: 'PRIVILEGE_SELECT_ROW',
                            width: COLUMN_WIDTH.SELECT_ROW,
                            component: Components.GridPrivilegeSelectRowColumn,
                        },
                        {
                            type: 'LANGUAGE_SELECT_ROW',
                            width: COLUMN_WIDTH.SELECT_ROW,
                            component: Components.GridLanguageSelectRowColumn,
                        },
                        {
                            type: 'ROW_NAME',
                            width: COLUMN_WIDTH.DYNAMIC,
                            component: Components.GridRowNameColumn,
                        },
                    ],
                },
            },
        },
    },
};
