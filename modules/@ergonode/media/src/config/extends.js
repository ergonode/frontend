/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    Components,
} from './imports';

export default {
    extendComponents: {
        '@Core/components/Grid/Layout/Collection/Cells': {
            MEDIA_ATTACH: Components.GridMediaAttachCollectionCell,
        },
    },
};
