/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'MediaTab',
    components: {
        CenterViewTemplate,
        MediaGrid,
    },
};
</script>
