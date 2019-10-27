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
import { Align } from '~/model/icons/Align';
import { GRAPHITE } from '~/assets/scss/_variables/_colors.scss';
import IconBase from '~/components/Icon/IconBase';

export default {
    name: 'IconAlignLeft',
    components: {
        IconBase,
    },
    props: {
        state: {
            type: String,
            default: Align.LEFT,
        },
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
            drawingCommands: 'M3,17 L21,17 L21,19 L3,19 L3,17 Z M3,14 L15,14 L15,16 L3,16 L3,14 Z M3,8 L15,8 L15,10 L3,10 L3,8 Z M3,11 L21,11 L21,13 L3,13 L3,11 Z M3,5 L21,5 L21,7 L3,7 L3,5 Z',
        };
    },
    computed: {
        iconTransform() {
            if (this.state === Align.RIGHT) return 'translate(12, 12) scale(-1, 1) translate(-12, -12)';

            return null;
        },
    },
};
</script>
