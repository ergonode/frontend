/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="collectionCellComponent"
        :data="data"
        :drafts="drafts"
        :object-fit="objectFit"
        @rowAction="onRowAction"
        @cellValue="onCellValueChange" />
</template>

<script>

export default {
    name: 'GridCollectionCell',
    props: {
        data: {
            type: Object,
            required: true,
        },
        drafts: {
            type: Object,
            default: () => ({}),
        },
        objectFit: {
            type: String,
            default: '',
        },
    },
    computed: {
        collectionCellComponent() {
            const extendedComponents = this.$getExtendedComponents('@Core/components/Grid/Layout/Collection/Cells');

            if (extendedComponents && extendedComponents[this.data.type]) {
                return extendedComponents[this.data.type];
            }

            return () => import('@Core/components/Grid/Layout/Collection/Cells/GridCollectionDefaultCell');
        },
    },
    methods: {
        onRowAction(payload) {
            this.$emit('rowAction', payload);
        },
        onCellValueChange(payload) {
            this.$emit('cellValue', payload);
        },
    },
};
</script>
