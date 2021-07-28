/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <SchedulerForm
                :submit-title="$t('@Channels._.submit')"
                :is-submitting="isSubmitting"
                :scope="scope"
                :errors="errors"
                :change-values="changeValues"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import SchedulerForm from '@Channels/components/Forms/SchedulerForm';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ChannelSchedulerTab',
    components: {
        SchedulerForm,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    async fetch() {
        await this.getSchedulerConfiguration({
            onError: () => {
                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: this.$t('@Channels.channel.components.ChannelSchedulerTab.errorMessage'),
                });
            },
        });
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('channel', [
            'updateScheduler',
            'getSchedulerConfiguration',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.updateScheduler({
                scope: this.scope,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Channels.channel.components.ChannelSchedulerTab.successMessage'),
            });

            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
