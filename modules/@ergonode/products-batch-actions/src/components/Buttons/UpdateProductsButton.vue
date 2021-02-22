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
    MODAL_TYPE,
} from '@Core/defaults/modals';
import updateButtonFeedbackMixin from '@Core/mixins/feedback/updateButtonFeedbackMixin';
import {
    getUUID,
} from '@Core/models/stringWrapper';
import PRIVILEGES from '@Products/config/privileges';
import {
    BATCH_ACTION_TYPE,
} from '@ProductsBatchActions/defaults';
import Button from '@UI/components/Button/Button';
import FeedbackProvider from '@UI/components/Feedback/FeedbackProvider';
import IconSync from '@UI/components/Icons/Feedback/IconSync';
import {
    mapActions,
} from 'vuex';

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
        ids: {
            type: Array,
            default: () => [],
        },
        excludedIds: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ]);
        },
    },
    methods: {
        ...mapActions('batchAction', [
            'addBatchAction',
            'removeBatchAction',
        ]),
        async onSubmit() {
            let emptyValues = 0;

            const keys = Object.keys(this.drafts);

            keys.forEach((key) => {
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
                    action: this.onUpdateProducts,
                });
            } else {
                this.onUpdateProducts();
            }
        },
        onUpdateProducts() {
            const keys = Object.keys(this.drafts);
            const uuid = getUUID();

            const tmp = {};
            const payload = [];

            keys.forEach((key) => {
                const [
                    id,
                    languageCode,
                ] = key.split('|');

                if (typeof tmp[id] === 'undefined') {
                    tmp[id] = payload.length;
                    payload[tmp[id]] = {
                        id,
                        values: [],
                    };
                }

                payload[tmp[id]].values.push({
                    language: languageCode,
                    value: this.drafts[key],
                });
            });

            this.addBatchAction({
                id: uuid,
                request: {
                    type: '$post',
                    href: 'batch-action',
                    filter: {
                        ids: {
                            list: this.ids.length > 0 ? this.ids : this.excludedIds,
                            included: this.ids.length > 0,
                        },
                    },
                    payload: {
                        type: BATCH_ACTION_TYPE.UPDATE_PRODUCTS,
                        payload,
                    },
                },
            });

            this.$emit('apply');
        },
    },
};
</script>
