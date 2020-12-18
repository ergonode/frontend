/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <UserPrivilegesGrid />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import UserPrivilegesGrid from '@Users/components/Grids/UserPrivilegesGrid';

export default {
    name: 'UserPrivilegesTab',
    components: {
        CenterViewTemplate,
        UserPrivilegesGrid,
    },
};
</script>
