/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IconBase
        :width="size"
        :height="size"
        :icon-color="fillColor">
        <path :d="drawingCommands" />
    </IconBase>
</template>

<script>
import IconBase from '~/components/Icon/IconBase';

export default {
    name: 'IconAlignJustify',
    components: {
        IconBase,
    },
    data() {
        return {
            drawingCommands: 'M5.00002344,14 L19.0000234,14 L19.0000234,16 L5.00002344,16 L5.00002344,14 Z M5.00002344,17 L19.0000234,17 L19.0000234,19 L5.00002344,19 L5.00002344,17 Z M5.00002344,11 L19.0000234,11 L19.0000234,13 L5.00002344,13 L5.00002344,11 Z M5.00002344,8 L19.0000234,8 L19.0000234,10 L5.00002344,10 L5.00002344,8 Z M5.00002344,5 L19.0000234,5 L19.0000234,7 L5.00002344,7 L5.00002344,5 Z',
            size: 24,
            fillColor: '#5C5F65',
        };
    },
};
</script>
