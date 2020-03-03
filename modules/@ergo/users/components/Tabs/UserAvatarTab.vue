/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <UserAvatarForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import UserAvatarForm from '@Users/components/Forms/UserAvatarForm';

export default {
    name: 'UserAvatarTab',
    components: {
        UserAvatarForm,
        ResponsiveCenteredViewTemplate,
    },
};
</script>
