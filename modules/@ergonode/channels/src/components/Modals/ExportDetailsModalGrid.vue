/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        :title="$t('@Channels.channel.components.ExportDetailsModalGrid.title')"
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

export default {
    name: 'ExportDetailsModalGrid',
    components: {
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
