/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseIcon
        :width="size"
        :height="size"
        :icon-color="fillColor">
        <path
            :d="drawingCommands"
            :transform="transform" />
    </BaseIcon>
</template>

<script>
import BaseIcon from '@Core/components/Icons/BaseIcon';
import { GREEN } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'IconSuccess',
    components: {
        BaseIcon,
    },
    props: {
        fillColor: {
            type: String,
            default: GREEN,
        },
        size: {
            type: [String, Number],
            default: '24',
        },
    },
    data() {
        return {
            drawingCommands: 'M12,2 C17.52,2 22,6.48 22,12 C22,17.52 17.52,22 12,22 C6.48,22 2,17.52 2,12 C2,6.48 6.48,2 12,2 Z M14,6 L5,15 L6.41,16.42 L14,8.83 L17.59,12.41 L19,11 L14,6 Z',
            transform: 'translate(12, 12) rotate(-180) translate(-12, -12)',
        };
    },
};
</script>
