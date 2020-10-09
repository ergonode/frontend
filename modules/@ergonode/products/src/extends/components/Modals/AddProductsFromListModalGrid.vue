/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        title="Choose product variants"
        :api-path="apiPath"
        :drafts="drafts"
        :collection-cell-binding="collectionCellBinding"
        :is-editable="true"
        :is-collection-layout="true"
        :is-basic-filter="true"
        @cell-value="onCellValueChange"
        @close="onClose">
        <template #appendFooter>
            <Button
                title="SAVE VARIANTS"
                @click.native="onSubmit">
                <template
                    v-if="isSubmitting"
                    #prepend="{ color }">
                    <IconSpinner :fill-color="color" />
                </template>
            </Button>
        </template>
    </ModalGrid>
</template>

<script>
import Button from '@Core/components/Button/Button';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import ModalGrid from '@Core/components/Modal/ModalGrid';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import scopeErrorsMixin from '@Core/mixins/feedback/scopeErrorsMixin';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AddProductsFromListModalGrid',
    components: {
        ModalGrid,
        Button,
        IconSpinner,
    },
    mixins: [
        gridDraftMixin,
        scopeErrorsMixin,
    ],
    data() {
        return {
            skus: {},
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('product', [
            'id',
        ]),
        apiPath() {
            return `products/${this.id}/children-and-available-products`;
        },
        collectionCellBinding() {
            return {
                imageColumn: 'default_image',
                descriptionColumn: 'default_label',
            };
        },
    },
    methods: {
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        ...mapActions('product', [
            'addBySku',
            'removeProductChildren',
        ]),
        onClose() {
            this.removeScopeErrors(this.scope);

            this.$emit('close');
        },
        async onSubmit() {
            this.isSubmitting = true;

            const requests = [];
            const skus = [];

            Object
                .keys(this.skus)
                .forEach((key) => {
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

                    if (skus.length) {
                        requests.push(this.addBySku({
                            skus,
                        }));
                    }
                });

            await Promise.all(requests);

            this.setDrafts();
            this.skus = {};

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Products attachment have been updated',
            });

            this.isSubmitting = false;
        },
        onCellValueChange({
            cellValues,
            rows,
        }) {
            const drafts = {};

            cellValues.forEach(({
                rowId, columnId, value,
            }) => {
                drafts[`${rowId}/${columnId}`] = value;

                const row = rows.find(({
                    id,
                }) => rowId === id.value);

                this.skus[rowId] = {
                    sku: row.sku.value,
                    value,
                };
            });

            this.setDrafts({
                ...this.drafts,
                ...drafts,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'variantProducts',
                value: drafts,
            });
        },
    },
};
</script>
