/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        :title="$t('@Channels.channel.components.CreateChannelModalForm.title')"
        @close="onClose">
        <template #body>
            <ChannelForm
                :submit-title="$t('@Channels._.create')"
                :proceed-title="$t('@Channels._.proceed')"
                :is-submitting="isSubmitting"
                :is-proceeding="isProceeding"
                :scope="scope"
                :errors="scopeErrors"
                :change-values="scopeChangeValues"
                @submit="onSubmit"
                @proceed="onProceed" />
        </template>
    </ModalForm>
</template>

<script>
import ChannelForm from '@Channels/components/Forms/ChannelForm';
import {
    ROUTE_NAME,
} from '@Channels/config/routes';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateChannelModalForm',
    components: {
        ChannelForm,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    async fetch() {
        this.__clearStorage();

        await this.getInitialDictionaries({
            keys: [
                'channels',
            ],
        });
    },
    data() {
        return {
            isSubmitting: false,
            isProceeding: false,
        };
    },
    methods: {
        ...mapActions('channel', [
            'createChannel',
            '__clearStorage',
        ]),
        ...mapActions('dictionaries', [
            'getInitialDictionaries',
        ]),
        onClose() {
            this.__clearStorage();
            this.removeScopeData(this.scope);

            this.$emit('close');
        },
        onSubmit() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.createChannel({
                scope: this.scope,
                onSuccess: this.onCreateSuccess,
                onError: this.onCreateError,
            });
        },
        onProceed() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }

            this.isProceeding = true;

            this.removeScopeErrors(this.scope);
            this.createChannel({
                scope: this.scope,
                onSuccess: this.onProceedSuccess,
                onError: this.onCreateError,
            });
        },
        onCreateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Channels.channel.components.CreateChannelModalForm.successMessage'),
            });

            this.isSubmitting = false;

            this.$emit('created');
            this.onClose();
        },
        onProceedSuccess(id) {
            this.isProceeding = false;

            this.onClose();
            this.$router.push({
                name: ROUTE_NAME.CHANNEL_EDIT_GENERAL,
                params: {
                    id,
                },
            });
        },
        onCreateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
            this.isProceeding = false;
        },
    },
};
</script>
