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
    name: 'IconCategory',
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
            drawingCommands: 'M10.2,5 L4.8,5 C3.81,5 3,6.04408987 3,7.00658987 L3,18.25 C3,19.2125 3.81,20 4.8,20 L19.2,20 C20.19,20 21,19.2125 21,18.25 L21,8.75658987 C21,7.79408987 20.19,7.00658987 19.2,7.00658987 L12,7.00658987 L10.2,5 Z',
        };
    },
};
</script>
