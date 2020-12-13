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
        removeDraftRow(rowId) {
            const tmpDrafts = {
                ...this.drafts,
            };

            Object.keys(tmpDrafts).forEach((key) => {
                if (key.includes(rowId)) {
                    delete this.drafts[key];
                }
            });
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
