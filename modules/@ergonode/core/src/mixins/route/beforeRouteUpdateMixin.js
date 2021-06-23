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

export default (paramKeys = [
    'id',
]) => ({
    beforeRouteUpdate(to, from, next) {
        let key = '';
        let i = 0;

        let hasChangedRoute = false;

        while ((i < paramKeys.length) && (key === '' || !hasChangedRoute)) {
            key = paramKeys[i];

            hasChangedRoute = to.params[key] !== from.params[key];
            i += 1;
        }

        if (hasChangedRoute) {
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
        } else {
            next();
        }
    },
    mixins: [
        confirmLeaveModalMixin,
    ],
    methods: {
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
    },
});
