/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <UserRoleForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import UserRoleForm from '@Users/components/Forms/UserRoleForm';

export default {
    name: 'RoleBaseTab',
    components: {
        CenterViewTemplate,
        UserRoleForm,
    },
};
</script>
