/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IconBase
        :width="size"
        :height="size"
        :icon-color="fillColor">
        <path
            :d="drawingCommands"
            :transform="iconTransform" />
    </IconBase>
</template>

<script>
import { Arrow } from '~/model/icons/Arrow';
import IconBase from '~/components/Icon/IconBase';

export default {
    name: 'IconArrowDouble',
    components: {
        IconBase,
    },
    props: {
        state: {
            type: String,
            default: Arrow.DOWN,
        },
        fillColor: {
            type: String,
            default: '#5C5F65',
        },
        size: {
            type: [String, Number],
            default: '24',
        },
    },
    data() {
        return {
            drawingCommands: 'M16.59,11.3 L18,12.71 L12,18.71 L6,12.71 L7.41,11.3 L12,15.88 L16.59,11.3 Z M16.59,5.3 L18,6.71 L12,12.71 L6,6.71 L7.41,5.3 L12,9.88 L16.59,5.3 Z',
        };
    },
    computed: {
        iconTransform() {
            if (this.state === Arrow.LEFT) return 'translate(12, 12.005) scale(1, -1) rotate(-270) translate(-12, -12.005)';
            if (this.state === Arrow.RIGHT) return 'translate(12, 12) rotate(-90) translate(-12, -12)';
            if (this.state === Arrow.UP) return 'translate(12, 12.005) scale(1, -1) translate(-12, -12.005)';

            return null;
        },
    },
};
</script>
