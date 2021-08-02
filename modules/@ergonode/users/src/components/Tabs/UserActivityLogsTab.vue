/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <UserActivityLogsGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import UserActivityLogsGrid from '@Users/components/Grids/UserActivityLogsGrid';

export default {
    name: 'UserActivityLogsTab',
    components: {
        UserActivityLogsGrid,
    },
};
</script>
