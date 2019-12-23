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
import BaseIcon from '~/components/Icon/BaseIcon';

export default {
    name: 'IconListSmall',
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
            drawingCommands: 'M4,7 L20,7 L20,8 L4,8 L4,7 Z M4,9 L20,9 L20,10 L4,10 L4,9 Z M4,11 L20,11 L20,12 L4,12 L4,11 Z M4,13 L20,13 L20,14 L4,14 L4,13 Z M4,15 L20,15 L20,16 L4,16 L4,15 Z M4,17 L20,17 L20,18 L4,18 L4,17 Z',
        };
    },
};
</script>
