/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ToolBarButton>
        <IconProcessing :fill-color="whiteColor" />
    </ToolBarButton>
</template>

<script>
import {
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';

export default {
    name: 'ToolBarSynchronizationButton',
    components: {
        ToolBarButton: () => import('@Core/components/ToolBar/ToolBarButton'),
        IconProcessing: () => import('@Core/components/Icons/Others/IconProcessing'),
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
    },
};
</script>
