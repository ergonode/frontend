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
        setDrafts(drafts) {
            this.drafts = deepmerge(this.drafts, drafts);
        },
    },
};
