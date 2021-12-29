/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        :title="$t('@Import.import.components.ImportDetailsModalGrid.title')"
        @close="onClose">
        <template #body>
            <ImportDetailsGrid
                :source-id="sourceId"
                :import-id="importId" />
        </template>
    </ModalGrid>
</template>

<script>
import ImportDetailsGrid from '@Import/components/Grids/ImportDetailsGrid';
import ModalGrid from '@UI/components/Modal/ModalGrid';

export default {
    name: 'ImportDetailsModalGrid',
    components: {
        ImportDetailsGrid,
        ModalGrid,
    },
    props: {
        sourceId: {
            type: String,
            required: true,
        },
        importId: {
            type: String,
            required: true,
        },
    },
    methods: {
        onClose() {
            this.$emit('close');
        },
    },
};
</script>
