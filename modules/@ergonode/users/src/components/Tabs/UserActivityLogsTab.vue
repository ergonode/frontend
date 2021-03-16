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

import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import UserActivityLogsGrid from '@Users/components/Grids/UserActivityLogsGrid';

export default {
    name: 'UserActivityLogsTab',
    components: {
        CenterViewTemplate,
        UserActivityLogsGrid,
    },
};
</script>
