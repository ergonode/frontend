/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <ChannelsGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>

import ChannelsGrid from '@Channels/components/Grids/ChannelsGrid';

export default {
    name: 'ChannelsTab',
    components: {
        ChannelsGrid,
    },
};
</script>
