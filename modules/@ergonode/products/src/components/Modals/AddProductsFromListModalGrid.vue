/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        title="Add products"
        api-path="products"
        :column-params="columnParams"
        :is-select-column="true"
        @close="onClose" />
</template>

<script>
import ModalGrid from '@Core/components/Modal/ModalGrid';
import {
    mapState,
} from 'vuex';

export default {
    name: 'AddProductsFromListModalGrid',
    components: {
        ModalGrid,
    },
    computed: {
        ...mapState('product', [
            'id',
        ]),
        columnParams() {
            return 'index,sku,esa_template';
        },
    },
    methods: {
        onClose() {
            this.$emit('close');
        },
    },
};
</script>
