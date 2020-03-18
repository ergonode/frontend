/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="logo">
        <IconLogoName :is-expanded="isExpanded" />
    </div>
</template>

<script>
export default {
    name: 'SideBarLogo',
    components: {
        IconLogoName: () => import('~/core/components/Icons/IconLogoName'),
    },
    props: {
        isExpanded: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .logo {
        padding: 24px;
    }
</style>
