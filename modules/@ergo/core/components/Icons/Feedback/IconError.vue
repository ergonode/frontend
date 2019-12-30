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
import BaseIcon from '@Core/components/Icons/BaseIcon';
import { RED } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'IconError',
    components: {
        BaseIcon,
    },
    props: {
        fillColor: {
            type: String,
            default: RED,
        },
        size: {
            type: [String, Number],
            default: '24',
        },
    },
    data() {
        return {
            drawingCommands: 'M1,20 L23,20 L12,1 L1,20 L1,20 Z M13,17 L11,17 L11,15 L13,15 L13,17 L13,17 Z M13,13 L11,13 L11,9 L13,9 L13,13 L13,13 Z',
        };
    },
};
</script>
