/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate :fixed="true">
        <template #centeredContent>
            <UserForm />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import UserForm from '@Users/components/Forms/UserForm';

export default {
    name: 'UserBaseTab',
    components: {
        ResponsiveCenteredViewTemplate,
        UserForm,
    },
};
</script>
