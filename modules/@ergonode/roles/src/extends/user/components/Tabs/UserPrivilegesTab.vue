/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
import UserPrivilegesGrid from '@Roles/components/Grids/UserPrivilegesGrid';

export default {
    name: 'UserPrivilegesTab',
    components: {
        UserPrivilegesGrid,
    },
};
</script>
