/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export default {
    data() {
        return {
            drafts: {},
        };
    },
    methods: {
        setDrafts(drafts = {}) {
            this.drafts = drafts;
        },
        removeDrafts(rowIds) {
            rowIds.forEach((rowId) => {
                delete this.drafts[rowId];
            });

            this.drafts = {
                ...this.drafts,
            };
        },
    },
};
