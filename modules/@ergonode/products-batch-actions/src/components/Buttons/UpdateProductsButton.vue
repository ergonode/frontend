/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FeedbackProvider
        :errors="errors"
        :change-values="changeValues">
        <template #default="{ hasValueToSave }">
            <Button
                data-cy="submit"
                :title="$t('@ProductsBatchActions.productBatchAction._.submit')"
                :floating="{ bottom: '24px', right: '24px' }"
                :disabled="!isAllowedToUpdate"
                @click.native="onSubmit">
                <template #prepend="{ color }">
                    <IconSync
                        v-if="hasValueToSave"
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
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import updateButtonFeedbackMixin from '@Core/mixins/feedback/updateButtonFeedbackMixin';
import PRIVILEGES from '@Products/config/privileges';
import Button from '@UI/components/Button/Button';
import FeedbackProvider from '@UI/components/Feedback/FeedbackProvider';
import IconSync from '@UI/components/Icons/Feedback/IconSync';

export default {
    name: 'UpdateProductsButton',
    components: {
        FeedbackProvider,
        Button,
        IconSync,
    },
    mixins: [
        updateButtonFeedbackMixin,
    ],
    props: {
        drafts: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    methods: {
        async onSubmit() {
            let emptyValues = 0;

            Object.keys(this.drafts).forEach((key) => {
                if (this.drafts[key] === ''
                    || this.drafts[key] === null
                    || (Array.isArray(this.drafts[key]) && !this.drafts[key].length)) {
                    emptyValues += 1;
                }
            });

            if (emptyValues > 0) {
                let title = this.$t('@ProductsBatchActions.productBatchAction.components.UpdateProductsButton.confirmTitlePlural', {
                    info: emptyValues,
                });
                let applyTitle = this.$t('@ProductsBatchActions.productBatchAction.components.UpdateProductsButton.confirmApplyPlural', {
                    info: emptyValues,
                });

                if (emptyValues === 1) {
                    title = this.$t('@ProductsBatchActions.productBatchAction.components.UpdateProductsButton.confirmTitleSingular');
                    applyTitle = this.$t('@ProductsBatchActions.productBatchAction.components.UpdateProductsButton.confirmApplySingular');
                }

                this.$confirm({
                    type: MODAL_TYPE.DESTRUCTIVE,
                    title,
                    subtitle: this.$t('@ProductsBatchActions.productBatchAction.components.UpdateProductsButton.confirmSubtitle'),
                    applyTitle,
                    cancelTitle: this.$t('@ProductsBatchActions.productBatchAction.components.UpdateProductsButton.confirmCancel'),
                    action: () => {
                        console.log('Applied');
                    },
                });
            }
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Products have been updated',
            });

            this.markChangeValuesAsSaved(this.scope);

            this.$emit('updated');
        },
        onUpdateError(errors) {
            this.onError(errors);
        },
    },
};
</script>
