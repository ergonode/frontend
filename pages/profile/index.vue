/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <UserProfileTabs
        title="Profile"
        icon="User" />
</template>

<script>
export default {
    name: 'Profile',
    middleware: ['tab/redirectToUserActivityLogGrid'],
    components: {
        UserProfileTabs: () => import('~/components/Pages/Tabs/UserProfileTabs'),
    },
};
</script>
