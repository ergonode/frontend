/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    AXIOS_CANCEL_TOKEN_DEFAULT_KEY,
} from '@Core/defaults/axios';
import confirmLeaveModalMixin from '@Core/mixins/feedback/confirmLeaveModalMixin';
import {
    mapActions,
} from 'vuex';

export default {
    beforeRouteLeave(to, from, next) {
        this.confirmModal({
            confirmCallback: () => {
                this.__clearFeedbackStorage();
                this.$clearCancelTokens([
                    AXIOS_CANCEL_TOKEN_DEFAULT_KEY,
                ]);

                next();
            },
            proceedCallback: () => {
                this.$clearCancelTokens([
                    AXIOS_CANCEL_TOKEN_DEFAULT_KEY,
                ]);

                next();
            },
        });
    },
    mixins: [
        confirmLeaveModalMixin,
    ],
    methods: {
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
    },
};
