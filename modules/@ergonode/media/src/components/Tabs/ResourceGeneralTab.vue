/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <ResourceForm
                :submit-title="$t('@Media._.submit')"
                :is-submitting="isSubmitting"
                :scope="scope"
                :errors="errors"
                :change-values="changeValues"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import ResourceForm from '@Media/components/Forms/ResourceForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ResourceGeneralTab',
    components: {
        ResourceForm,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('media', [
            'updateResource',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.updateResource({
                scope: this.scope,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Media.media.components.ResourceGeneralTab.successMessage'),
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
