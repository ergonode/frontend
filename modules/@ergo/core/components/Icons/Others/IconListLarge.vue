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
    name: 'IconListLarge',
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
            drawingCommands: 'M4,7 L20,7 L20,10 L4,10 L4,7 Z M4,11 L20,11 L20,14 L4,14 L4,11 Z M4,15 L20,15 L20,18 L4,18 L4,15 Z',
        };
    },
};
</script>
