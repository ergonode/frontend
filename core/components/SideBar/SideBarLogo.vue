/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="logo">
        <IconLogoName
            :full-logo="isExpanded"
            :name-color="whiteColor" />
    </div>
</template>

<script>
import { WHITE } from '@Core/assets/scss/_js-variables/colors.scss';

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
    computed: {
        whiteColor() {
            return WHITE;
        },
    },
};
</script>

<style lang="scss" scoped>
    .logo {
        padding: 24px;
    }
</style>
