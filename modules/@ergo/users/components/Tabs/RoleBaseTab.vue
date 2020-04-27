/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <UserRoleForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import UserRoleForm from '@Users/components/Forms/UserRoleForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'RoleBaseTab',
    components: {
        ResponsiveCenteredViewTemplate,
        UserRoleForm,
    },
};
</script>
