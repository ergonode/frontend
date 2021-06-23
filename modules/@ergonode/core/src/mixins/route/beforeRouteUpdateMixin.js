/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    AXIOS_CANCEL_TOKEN_DEFAULT_KEY,
} from '@Core/defaults/axios';
import confirmLeaveModalMixin from '@Core/mixins/feedback/confirmLeaveModalMixin';
import {
    arraysAreEqual,
} from '@Core/models/arrayWrapper';
import {
    mapActions,
} from 'vuex';

export default {
    beforeRouteUpdate(to, from, next) {
        console.log('before update');
        const toParamKeys = Object.keys(to.params);
        const fromParamKeys = Object.keys(from.params);
        const areParamsEqual = arraysAreEqual(toParamKeys, fromParamKeys);

        if (areParamsEqual) {
            let key = '';
            let i = 0;
            let hasChangedRoute = false;

            while ((i < toParamKeys.length) && (key === '' || !hasChangedRoute)) {
                key = toParamKeys[i];

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
                console.log('next1');
                next();
            }
        } else {
            console.log('next2');
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
};
