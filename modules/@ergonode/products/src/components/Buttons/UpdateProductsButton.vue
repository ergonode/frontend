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
                :title="$t('@Products._.submit')"
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
import PRIVILEGES from '@Products/config/privileges';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'UpdateProductsButton',
    mixins: [
        updateButtonFeedbackMixin,
    ],
    props: {
        drafts: {
            type: Object,
            default: () => ({}),
        },
        columns: {
            type: Array,
            default: () => [],
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
        ...mapActions('product', [
            'updateProductsValues',
        ]),
        async onSubmit() {
            if (this.isSubmitting) {
                return;
            }

            this.isSubmitting = true;

            this.updateProductsValues({
                scope: this.scope,
                drafts: this.drafts,
                columns: this.columns,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Products.product.components.UpdateProductsButton.alertSuccess'),
            });

            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);

            this.$emit('updated');
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
