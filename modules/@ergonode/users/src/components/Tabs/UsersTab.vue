/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <UsersGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import UsersGrid from '@Users/components/Grids/UsersGrid';

export default {
    name: 'UsersTab',
    components: {
        UsersGrid,
    },
};
</script>
