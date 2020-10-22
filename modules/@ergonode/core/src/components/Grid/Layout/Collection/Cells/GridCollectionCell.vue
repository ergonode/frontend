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
        @row-action="onRowAction"
        @cell-value="onCellValueChange" />
</template>

<script>

export default {
    name: 'GridCollectionCell',
    props: {
        /**
         * Component data used for filling cell
         */
        data: {
            type: Object,
            required: true,
        },
        /**
         * The drafts are unsaved changes, cached changed data at given time
         */
        drafts: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Determines image objectFit property
         */
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
            this.$emit('row-action', payload);
        },
        onCellValueChange(payload) {
            this.$emit('cell-value', payload);
        },
    },
};
</script>
