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
                :title="$t('@ProductBatchActions.productBatchAction._.submit')"
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
    create,
} from '@BatchActions/services';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import updateButtonFeedbackMixin from '@Core/mixins/feedback/updateButtonFeedbackMixin';
import {
    BATCH_ACTION_TYPE,
} from '@ProductBatchActions/defaults';
import PRIVILEGES from '@Products/config/privileges';

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
        filter: {
            type: [
                Object,
                String,
            ],
            required: true,
        },
        selectedRowsCount: {
            type: Number,
            default: 0,
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
        addBatchAction({
            request,
        }) {
            try {
                create({
                    $axios: this.$axios,
                    ...request,
                });

                this.$addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    message: this.$t('@ProductBatchActions.productBatchAction.components.UpdateProductsButton.successAlert'),
                });
            } catch (e) {
                if (this.$axios.isCancel(e)) {
                    return;
                }

                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: this.$t('@ProductBatchActions.productBatchAction.components.UpdateProductsButton.errorAlert'),
                });
            }
        },
        onSubmit() {
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
                let title = this.$t('@ProductBatchActions.productBatchAction.components.UpdateProductsButton.confirmTitlePlural', {
                    info: emptyValues,
                });
                let applyTitle = this.$t('@ProductBatchActions.productBatchAction.components.UpdateProductsButton.confirmApplyPlural', {
                    info: emptyValues,
                });

                if (emptyValues === 1) {
                    title = this.$t('@ProductBatchActions.productBatchAction.components.UpdateProductsButton.confirmTitleSingular');
                    applyTitle = this.$t('@ProductBatchActions.productBatchAction.components.UpdateProductsButton.confirmApplySingular');
                }

                this.$confirm({
                    type: MODAL_TYPE.DESTRUCTIVE,
                    title,
                    subtitle: this.$t('@ProductBatchActions.productBatchAction.components.UpdateProductsButton.confirmSubtitle'),
                    applyTitle,
                    cancelTitle: this.$t('@ProductBatchActions.productBatchAction.components.UpdateProductsButton.confirmCancel'),
                    action: this.onUpdateProducts,
                });
            } else {
                this.onUpdateProducts();
            }
        },
        onUpdateProducts() {
            const keys = Object.keys(this.drafts);
            const tmp = {};
            const payload = [];

            if (!keys.length) {
                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: this.$t('@ProductBatchActions.productBatchAction.components.UpdateProductsButton.emptyAttributes'),
                });

                return false;
            }

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

            const request = {
                type: '$post',
                href: 'batch-action',
                payload: {
                    type: BATCH_ACTION_TYPE.UPDATE_PRODUCTS,
                    filter: this.filter,
                    payload,
                },
            };

            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('@ProductBatchActions.productBatchAction.components.UpdateProductsButton.confirmCountTitle', {
                    count: this.selectedRowsCount,
                }),
                subtitle: this.$t('@ProductBatchActions.productBatchAction.components.UpdateProductsButton.confirmCountSubtitle', {
                    count: this.selectedRowsCount,
                }),
                applyTitle: this.$t('@ProductBatchActions.productBatchAction.components.UpdateProductsButton.confirmCountApplyPlural', {
                    count: this.selectedRowsCount,
                }),
                cancelTitle: this.$t('@ProductBatchActions.productBatchAction.components.UpdateProductsButton.confirmCancel'),
                action: () => {
                    this.addBatchAction({
                        request,
                    });

                    this.$emit('apply');
                },
            });

            return true;
        },
    },
};
</script>
