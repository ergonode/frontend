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
import UserForm from '@Users/components/Forms/UserForm';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'UserBaseTab',
    components: {
        ResponsiveCenteredViewTemplate,
        UserForm,
    },
};
</script>
