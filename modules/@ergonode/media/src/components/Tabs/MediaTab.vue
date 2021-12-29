/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <MediaGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import MediaGrid from '@Media/components/Grids/MediaGrid';

export default {
    name: 'MediaTab',
    components: {
        MediaGrid,
    },
};
</script>
