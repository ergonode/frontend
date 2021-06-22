/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

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
            this.__clearFeedbackStorage();
        }

        next();
    },
    methods: {
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
    },
});
