/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { mapActions } from 'vuex';
import { ALERT_TYPE } from '@Core/defaults/alerts';

export default function ({ namespace, createRequest }) {
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
            onCreateRequest(onSuccess) {
                this.isRequestPending = true;
                this.removeValidationErrors();

                createRequest().then(response => response.default({
                    $axios: this.$axios,
                    $store: this.$store,
                }).then(({ id }) => {
                    this.isRequestPending = false;
                    this.removeValidationErrors();
                    this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: `${namespace} has been created` });

                    onSuccess(id);

                    this.$emit('created');
                }).catch((e) => {
                    this.isRequestPending = false;
                    this.onError(e.data);
                }));
            },
        },
    };
}
