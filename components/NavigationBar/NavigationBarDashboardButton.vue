/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarButton @click.native="onClick">
        <img
            class="part__element"
            src="~assets/images/logo.svg"
            alt="ergonode"
            title="ergonode">
    </NavigationBarButton>
</template>

<script>
export default {
    name: 'NavigationBarDashboardButton',
    components: {
        NavigationBarButton: () => import('~/core/components/NavigationBar/NavigationBarButton'),
    },
    methods: {
        onClick() {
            this.$router.push('/dashboard');
        },
    },
};
</script>
