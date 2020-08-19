/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <UserForm />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import UserForm from '@Users/components/Forms/UserForm';

export default {
    name: 'UserBaseTab',
    components: {
        CenterViewTemplate,
        UserForm,
    },
};
</script>
