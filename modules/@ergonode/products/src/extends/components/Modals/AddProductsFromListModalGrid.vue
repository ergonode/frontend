/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        title="Choose product variants"
        :api-path="apiPath"
        :collection-cell-binding="collectionCellBinding"
        :is-editable="true"
        :is-collection-layout="true"
        :is-basic-filter="true"
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
    mapState,
} from 'vuex';

export default {
    name: 'AddProductsFromListModalGrid',
    components: {
        ModalGrid,
        Button,
        IconSpinner,
    },
    data() {
        return {
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
        onClose() {
            this.$emit('close');
        },
        onSubmit() {

        },
    },
};
</script>
