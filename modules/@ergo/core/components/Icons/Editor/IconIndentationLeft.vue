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
import { GRAPHITE } from '~/assets/scss/_variables/_colors.scss';
import BaseIcon from '@Core/components/Icons/BaseIcon';

export default {
    name: 'IconIndentionLeft',
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
            default: '24',
        },
    },
    data() {
        return {
            drawingCommands: 'M5,12 L8,9 L8,15 L5,12 Z M5,17 L19,17 L19,19 L5,19 L5,17 Z M11,14 L19,14 L19,16 L11,16 L11,14 Z M11,11 L19,11 L19,13 L11,13 L11,11 Z M5,5 L19,5 L19,7 L5,7 L5,5 Z M11,8 L19,8 L19,10 L11,10 L11,8 Z',
        };
    },
};
</script>
