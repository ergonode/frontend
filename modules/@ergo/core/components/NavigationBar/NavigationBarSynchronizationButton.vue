/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarButton>
        <IconProcessing :fill-color="whiteColor" />
    </NavigationBarButton>
</template>

<script>
import { WHITE } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'NavigationBarSynchronizationButton',
    components: {
        NavigationBarButton: () => import('@Core/components/NavigationBar/NavigationBarButton'),
        IconProcessing: () => import('@Core/components/Icons/Others/IconProcessing'),
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
    },
};
</script>
