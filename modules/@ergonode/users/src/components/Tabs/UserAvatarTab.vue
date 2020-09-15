/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <UserAvatarForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import UserAvatarForm from '@Users/components/Forms/UserAvatarForm';

export default {
    name: 'UserAvatarTab',
    components: {
        UserAvatarForm,
        CenterViewTemplate,
    },
};
</script>
