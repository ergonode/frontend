/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <TransitionsGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import TransitionsGrid from '@Transitions/components/Grids/TransitionsGrid';

export default {
    name: 'TransitionsTab',
    components: {
        TransitionsGrid,
    },
};
</script>
