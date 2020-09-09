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
                'removeErrors',
            ]),
            onActionRequest(onSuccess) {
                this.isRequestPending = true;
                this.removeErrors();

                request().then(response => response.default({
                    $this: this,
                    $axios: this.$axios,
                    $store: this.$store,
                    $addAlert: this.$addAlert,
                }).then(({
                    id,
                }) => {
                    this.isRequestPending = false;
                    this.removeErrors();
                    this.$addAlert({
                        type: ALERT_TYPE.SUCCESS,
                        message: `${namespace} has been ${action.toLowerCase()}d`,
                    });

                    onSuccess(id);

                    this.$emit(action.toLowerCase());
                }).catch((e) => {
                    this.isRequestPending = false;
                    if (e.data) {
                        this.onError(e.data);
                    }
                }));
            },
        },
    };
}
