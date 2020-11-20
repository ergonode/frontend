/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <SchedulerForm
                :submit-title="$t('core.buttons.submit')"
                :is-submitting="isSubmitting"
                :scope="scope"
                :errors="errors"
                :changed-values="changeValues"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import SchedulerForm from '@Channels/components/Forms/SchedulerForm';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ChannelSchedulerTab',
    components: {
        CenterViewTemplate,
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
                    message: 'Scheduler configuration hasn`t been fetched properly',
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
                message: 'Channel scheduler has been updated',
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
