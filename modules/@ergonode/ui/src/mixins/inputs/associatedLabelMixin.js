/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    getUUID,
} from '@Core/models/stringWrapper';

export default {
    beforeCreate() {
        this.associatedLabel = getUUID();
    },
    beforeDestroy() {
        delete this.associatedLabel;
    },
};
