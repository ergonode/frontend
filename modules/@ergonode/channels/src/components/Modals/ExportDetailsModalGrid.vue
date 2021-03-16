/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        title="Export details"
        @close="onClose">
        <template #body>
            <ExportDetailsGrid
                :channel-id="channelId"
                :export-id="exportId" />
        </template>
    </ModalGrid>
</template>

<script>
import ExportDetailsGrid from '@Channels/components/Grids/ExportDetailsGrid';
import ModalGrid from '@UI/components/Modal/ModalGrid';

export default {
    name: 'ExportDetailsModalGrid',
    components: {
        ModalGrid,
        ExportDetailsGrid,
    },
    props: {
        channelId: {
            type: String,
            required: true,
        },
        exportId: {
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
