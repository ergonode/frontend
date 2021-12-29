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
import IconProcessing from '@UI/components/Icons/Others/IconProcessing';
import ToolBarButton from '@UI/components/ToolBar/ToolBarButton';

export default {
    name: 'ToolBarSynchronizationButton',
    components: {
        ToolBarButton,
        IconProcessing,
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
    },
};
</script>
