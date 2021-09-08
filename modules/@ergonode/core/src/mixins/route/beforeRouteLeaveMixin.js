/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    AXIOS_CANCEL_TOKEN_DEFAULT_KEY,
} from '@Core/defaults/axios';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    mapState,
} from 'vuex';

export default {
    beforeRouteLeave(to, from, next) {
        const changeValuesKeys = Object.keys(this.changeValues);
        const hasError = Object.keys(this.errors).length > 0;
        const hasChange = changeValuesKeys.length > 0
            && changeValuesKeys.some(key => Object.keys(this.changeValues[key]).length > 0
                && !this.changeValues[key].saved);

        if (hasError || hasChange) {
            this.$confirm({
                type: MODAL_TYPE.POSITIVE,
                applyTitle: 'YES, I\'M SURE',
                title: 'Are you sure you want to leave page without saving the data?',
                action: () => {
                    this.$clearCancelTokens([
                        AXIOS_CANCEL_TOKEN_DEFAULT_KEY,
                    ]);

                    next();
                },
            });
        } else {
            this.$clearCancelTokens([
                AXIOS_CANCEL_TOKEN_DEFAULT_KEY,
            ]);

            next();
        }
    },
    computed: {
        ...mapState('feedback', [
            'errors',
            'changeValues',
        ]),
    },
};
