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
import IconProcessing from '@Core/components/Icons/Others/IconProcessing';
import ToolBarButton from '@Core/components/ToolBar/ToolBarButton';

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
