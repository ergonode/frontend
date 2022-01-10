/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FeedbackProvider
        :errors="errors"
        :change-values="changeValues">
        <template #default="{ hasValueToSave }">
            <Button
                data-cy="submit"
                :title="$t('@Transitions._.submit')"
                :floating="saveChangesButtonFloatingStyle"
                :disabled="!isAllowedToUpdate"
                @click.native="onSubmit">
                <template #prepend="{ color }">
                    <IconSpinner
                        v-if="isSubmitting"
                        :fill-color="color" />
                    <IconSync
                        v-else-if="hasValueToSave"
                        :fill-color="color" />
                </template>
            </Button>
        </template>
    </FeedbackProvider>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import updateButtonFeedbackMixin from '@Core/mixins/feedback/updateButtonFeedbackMixin';
import PRIVILEGES from '@Transitions/config/privileges';
import {
    Z_INDEX_LVL_2,
} from '@UI/assets/scss/_js-variables/indexes.scss';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'UpdateProductStatusConditionDesignerButton',
    mixins: [
        updateButtonFeedbackMixin,
    ],
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        saveChangesButtonFloatingStyle() {
            return {
                bottom: '24px',
                right: '24px',
                zIndex: Z_INDEX_LVL_2,
            };
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.update,
            ]);
        },
    },
    methods: {
        ...mapActions('statusTransition', [
            'updateStatusTransition',
        ]),
        ...mapActions('workflowConditions', [
            'updateConditions',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.updateConditions({
                scope: this.scope,
                transitionId: this.$route.params.id,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        async onUpdateSuccess() {
            await this.updateStatusTransition({
                scope: this.scope,
            });

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Transitions.transition.components.UpdateProductStatusConditionDesignerButton.successMessage'),
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
