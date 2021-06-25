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
        const callback = () => {
            this.__clearFeedbackStorage();
            this.$clearCancelTokens([
                AXIOS_CANCEL_TOKEN_DEFAULT_KEY,
            ]);

            next();
        };

        this.confirmModal({
            confirmCallback: callback,
            proceedCallback: callback,
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
