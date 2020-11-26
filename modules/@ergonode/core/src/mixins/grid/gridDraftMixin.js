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
        removeDraftRows(rowIds) {
            const tmpDrafts = {
                ...this.drafts,
            };

            Object.keys(tmpDrafts).forEach((key) => {
                rowIds.forEach((rowId) => {
                    if (key.includes(rowId)) {
                        delete this.drafts[key];
                    }
                });
            });
        },
    },
};
