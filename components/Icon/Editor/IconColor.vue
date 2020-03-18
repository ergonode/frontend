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
    name: 'IconColor',
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
            drawingCommands: 'M5,19 L19,19 L19,21 L5,21 L5,19 Z M9.27272262,14.9940467 L8.29090584,17 L6,17 L11.1817938,5 L12.8181551,5 L18,17 L15.7090942,17 L14.7272774,14.9940467 L9.27272262,14.9940467 Z M12.0000251,7.66873321 L10,13 L14,13 L12.0000251,7.66873321 Z',
        };
    },
};
</script>
