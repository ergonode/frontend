/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseIcon
        :width="size"
        :height="size"
        :style="iconTransform"
        :icon-color="fillColor">
        <path :d="drawingCommands" />
    </BaseIcon>
</template>

<script>
import { ARROW } from '@Core/defaults/icons';
import { GRAPHITE } from '@Core/assets/scss/_js-variables/colors.scss';
import BaseIcon from '@Core/components/Icons/BaseIcon';

export default {
    name: 'IconArrowDouble',
    components: {
        BaseIcon,
    },
    props: {
        state: {
            type: String,
            default: ARROW.DOWN,
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
            drawingCommands: 'M16.59,11.3 L18,12.71 L12,18.71 L6,12.71 L7.41,11.3 L12,15.88 L16.59,11.3 Z M16.59,5.3 L18,6.71 L12,12.71 L6,6.71 L7.41,5.3 L12,9.88 L16.59,5.3 Z',
        };
    },
    computed: {
        iconTransform() {
            if (this.state === ARROW.LEFT) return { transform: 'rotate(-270deg)' };
            if (this.state === ARROW.RIGHT) return { transform: 'rotate(-90deg)' };
            if (this.state === ARROW.UP) return { transform: 'rotate(-180deg)' };

            return null;
        },
    },
};
</script>
