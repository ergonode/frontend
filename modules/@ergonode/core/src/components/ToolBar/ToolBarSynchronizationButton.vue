/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'ToolBarSynchronizationButton',
    computed: {
        whiteColor() {
            return WHITE;
        },
    },
};
</script>
