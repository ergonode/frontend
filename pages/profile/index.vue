/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UserProfilePage
        title="Profile"
        icon="User" />
</template>

<script>
export default {
    name: 'Index',
    middleware: ['tab/redirectToUserActivityLogGrid'],
    components: {
        UserProfilePage: () => import('~/components/Pages/UserProfilePage'),
    },
};
</script>
