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
    name: 'IconAlignJustify',
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
            drawingCommands: 'M5.00002344,14 L19.0000234,14 L19.0000234,16 L5.00002344,16 L5.00002344,14 Z M5.00002344,17 L19.0000234,17 L19.0000234,19 L5.00002344,19 L5.00002344,17 Z M5.00002344,11 L19.0000234,11 L19.0000234,13 L5.00002344,13 L5.00002344,11 Z M5.00002344,8 L19.0000234,8 L19.0000234,10 L5.00002344,10 L5.00002344,8 Z M5.00002344,5 L19.0000234,5 L19.0000234,7 L5.00002344,7 L5.00002344,5 Z',
        };
    },
};
</script>
