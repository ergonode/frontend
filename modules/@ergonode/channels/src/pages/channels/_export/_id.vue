/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ExportPage title="Export details" />
</template>

<script>

export default {
    name: 'EditExport',
    components: {
        ExportPage: () => import('@Channels/components/Pages/ExportPage'),
    },
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.channel_id)
            && /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.export_id);
    },
    async fetch({
        store, params,
    }) {
        await store.dispatch('channels/getExport', {
            channel_id: params.channel_id,
            export_id: params.export_id,
        });
    },
    head() {
        return {
            title: 'Export - Channel - Ergonode',
        };
    },
};
</script>
