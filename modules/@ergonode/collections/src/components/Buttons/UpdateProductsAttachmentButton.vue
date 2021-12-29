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
                :title="$t('@Collections._.submit')"
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
    PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME,
} from '@Collections/defaults';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import updateButtonFeedbackMixin from '@Core/mixins/feedback/updateButtonFeedbackMixin';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'UpdateProductsAttachmentButton',
    mixins: [
        updateButtonFeedbackMixin,
    ],
    props: {
        skus: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('collection', [
            'addBySku',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }

            const skusKeys = Object.keys(this.skus);
            const skus = [];

            this.isSubmitting = true;

            skusKeys.forEach((key) => {
                const {
                    sku,
                    value,
                } = this.skus[key];

                if (value) {
                    skus.push(sku);
                }
            });

            if (skus.length) {
                this.removeScopeErrors(this.scope);
                this.addBySku({
                    scope: this.scope,
                    skus,
                    onSuccess: this.onSubmitSuccess,
                    onError: this.onAddError,
                });
            }
        },
        onSubmitSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Collections.collection.components.UpdateProductsAttachmentButton.successMessage'),
            });
            this.isSubmitting = false;

            const event = new CustomEvent(PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME);

            document.documentElement.dispatchEvent(event);

            this.$emit('updated');
        },
        onAddError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
