/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <ChannelForm
                submit-title="SAVE CHANGES"
                :is-submitting="isSubmitting"
                :errors="errors"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import ChannelForm from '@Channels/components/Forms/ChannelForm';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ChannelGeneralTab',
    components: {
        CenterViewTemplate,
        ChannelForm,
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('validations', {
            errors: state => state.errors.channelGeneralTab,
        }),
    },
    methods: {
        ...mapActions('channel', [
            'updateChannel',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeErrors();
            this.updateChannel({
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Channel updated',
            });

            this.isSubmitting = false;
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
