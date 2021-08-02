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
import {
    PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME,
} from '@Products/extends/defaults';
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
        ...mapActions('product', [
            'addByList',
            'removeProductChildren',
        ]),
        async onSubmit() {
            this.isSubmitting = true;

            const requests = [];
            const skusKeys = Object.keys(this.skus);
            const skus = [];

            skusKeys.forEach((key) => {
                const {
                    sku,
                    value,
                } = this.skus[key];

                if (value) {
                    skus.push(sku);
                } else {
                    requests.push(this.removeProductChildren({
                        childrenId: key,
                        skus: sku,
                    }));
                }
            });

            if (skus.length) {
                requests.push(this.addByList({
                    skus,
                }));
            }

            await Promise.all(requests);

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Products.productExtend.components.UpdateProductsAttachmentButton.successMessage'),
            });

            this.isSubmitting = false;

            if (skusKeys.length) {
                const event = new CustomEvent(PRODUCTS_ATTACHMENT_UPDATED_EVENT_NAME);

                document.documentElement.dispatchEvent(event);
            }

            this.$emit('updated');
        },
    },
};
</script>
