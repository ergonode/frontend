/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Components,
} from '@Users/config/imports';

export default {
    extendComponents: {
        '@UI/components/Grid/Layout/Table/Cells/Data': {
            LANGUAGE_NAME_HINT: Components.GridLanguageNameHintDataCell,
        },
        '@UI/components/Grid/Layout/Table/Columns': {
            LANGUAGE_ROW_CHECK: Components.GridLanguageRowCheckColumn,
        },
    },
};
