/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    mapActions,
} from 'vuex';

export default function ({
    action, namespace, request,
}) {
    return {
        data() {
            return {
                isRequestPending: false,
            };
        },
        methods: {
            ...mapActions('validations', [
                'onError',
                'removeValidationErrors',
            ]),
            onActionRequest(onSuccess) {
                if (!this.isRequestPending) {
                    this.isRequestPending = true;

                    request().then(response => response.default({
                        $axios: this.$axios,
                        $store: this.$store,
                    }).then(({
                        id,
                    }) => {
                        this.isRequestPending = false;
                        this.removeValidationErrors();
                        this.$addAlert({
                            type: ALERT_TYPE.SUCCESS,
                            message: `${namespace} has been ${action.toLowerCase()}d`,
                        });

                        onSuccess(id);

                        this.$emit(action.toLowerCase());
                    }).catch((e) => {
                        this.isRequestPending = false;
                        this.removeValidationErrors();
                        this.onError(e.data);
                    }));
                }
            },
        },
    };
}
