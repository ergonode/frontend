/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseIcon
        :width="size"
        :height="size"
        :icon-color="fillColor">
        <path :d="drawingCommands" />
    </BaseIcon>
</template>

<script>
import { GRAPHITE } from '@Core/assets/scss/_variables/_colors.scss';
import BaseIcon from '@Core/components/Icons/BaseIcon';

export default {
    name: 'IconHamburgerList',
    components: {
        BaseIcon,
    },
    props: {
        fillColor: {
            type: String,
            default: GRAPHITE,
        },
        size: {
            type: [String, Number],
            default: 24,
        },
    },
    data() {
        return {
            drawingCommands: 'M7,18 L7,16 L21,16 L21,18 L7,18 Z M7,13 L7,11 L21,11 L21,13 L7,13 Z M7,6 L21,6 L21,8 L7,8 L7,6 Z M3,18 L3,16 L5,16 L5,18 L3,18 Z M3,13 L3,11 L5,11 L5,13 L3,13 Z M3,6 L5,6 L5,8 L3,8 L3,6 Z',
        };
    },
};
</script>
