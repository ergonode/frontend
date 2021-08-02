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
                :floating="{ bottom: '24px', right: '24px' }"
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
    mapState,
} from 'vuex';

export default {
    name: 'UpdateProductTemplateButton',
    mixins: [
        updateButtonFeedbackMixin,
    ],
    props: {
        attributes: {
            type: Object,
            default: () => ({}),
        },
        languageCode: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('product', [
            'drafts',
        ]),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    methods: {
        ...mapActions('product', [
            'updateProductValues',
            'getProductCompleteness',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.updateProductValues({
                scope: this.scope,
                attributes: this.attributes,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        async onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Products.product.components.UpdateProductTemplateButton.successMessage'),
            });

            await this.getProductCompleteness({
                languageCode: this.languageCode,
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
