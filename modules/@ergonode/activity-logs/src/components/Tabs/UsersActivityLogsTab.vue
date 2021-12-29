/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <UsersActivityLogsGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import UsersActivityLogsGrid from '@ActivityLogs/components/Grids/UsersActivityLogsGrid';

export default {
    name: 'UsersActivityLogsTab',
    components: {
        UsersActivityLogsGrid,
    },
};
</script>
