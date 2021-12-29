/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="navigation-side-bar-logo">
        <IconLogoName
            :full-logo="isExpanded"
            :name-color="whiteColor" />
    </div>
</template>

<script>
import IconLogoName from '@Core/components/Icons/Logo/IconLogoName';
import {
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'NavigationSideBarLogo',
    components: {
        IconLogoName,
    },
    props: {
        /**
         * Determines state of expanded component
         */
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
    .navigation-side-bar-logo {
        padding: 24px;
    }
</style>
