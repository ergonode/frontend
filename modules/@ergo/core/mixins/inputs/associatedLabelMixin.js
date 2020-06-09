/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { getUUID } from '@Core/models/stringWrapper';

export default {
    computed: {
        associatedLabel() {
            return getUUID();
        },
    },
};
