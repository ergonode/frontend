/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <ChannelHistoryGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import ChannelHistoryGrid from '@Channels/components/Grids/ChannelHistoryGrid';

export default {
    name: 'ChannelHistoryTab',
    components: {
        ChannelHistoryGrid,
    },
};
</script>
