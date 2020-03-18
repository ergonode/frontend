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
import { GRAPHITE } from '@Core/assets/scss/_js-variables/colors.scss';
import BaseIcon from '@Core/components/Icons/BaseIcon';

export default {
    name: 'IconTable',
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
            drawingCommands: 'M5,7 L8,7 L8,9 L5,9 L5,7 Z M5,10 L8,10 L8,12 L5,12 L5,10 Z M5,13 L8,13 L8,15 L5,15 L5,13 Z M5,16 L8,16 L8,18 L5,18 L5,16 Z M9,7 L12,7 L12,9 L9,9 L9,7 Z M9,10 L12,10 L12,12 L9,12 L9,10 Z M9,13 L12,13 L12,15 L9,15 L9,13 Z M9,16 L12,16 L12,18 L9,18 L9,16 Z M13,7 L16,7 L16,9 L13,9 L13,7 Z M17,7 L20,7 L20,9 L17,9 L17,7 Z M13,10 L16,10 L16,12 L13,12 L13,10 Z M17,10 L20,10 L20,12 L17,12 L17,10 Z M13,13 L16,13 L16,15 L13,15 L13,13 Z M17,13 L20,13 L20,15 L17,15 L17,13 Z M13,16 L16,16 L16,18 L13,18 L13,16 Z M17,16 L20,16 L20,18 L17,18 L17,16 Z',
        };
    },
};
</script>
