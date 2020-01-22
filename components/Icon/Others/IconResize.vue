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
import BaseIcon from '~/components/Icon/BaseIcon';
import { GRAPHITE } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'IconResize',
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
            drawingCommands: 'M7 1H8V2H7V1ZM6 3V2H7V3H6ZM5 4V3H6V4H5ZM4 5V4H5V5H4ZM3 6V5H4V6H3ZM2 7V6H3V7H2ZM2 7V8H1V7H2ZM7 6H6V7H5V8H6V7H7V6ZM7 6V5H8V6H7Z',
        };
    },
};
</script>
