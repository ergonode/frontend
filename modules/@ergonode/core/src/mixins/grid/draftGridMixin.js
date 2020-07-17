/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import deepmerge from 'deepmerge';

export default {
    data() {
        return {
            drafts: {},
        };
    },
    methods: {
        setDrafts(drafts = null) {
            if (drafts) {
                this.drafts = deepmerge(this.drafts, drafts);
            } else {
                this.drafts = {};
            }
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
    },
};
