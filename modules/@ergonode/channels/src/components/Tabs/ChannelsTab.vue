/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'ChannelsTab',
    components: {
        CenterViewTemplate,
        ChannelsGrid,
    },
};
</script>
