/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

let associatedLabel = 0;

export default {
    beforeCreate() {
        this.associatedLabel = associatedLabel.toString();
        associatedLabel += 1;
    },
    beforeDestroy() {
        delete this.associatedLabel;
    },
};
