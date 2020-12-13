/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';

export default {
    name: 'UsersActivityLogsTab',
    components: {
        CenterViewTemplate,
        UsersActivityLogsGrid,
    },
};
</script>
