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
        <rect
            width="2"
            height="12"
            transform="matrix(-1 0 0 1 8 6)" />
        <path :d="drawingCommands" />
    </BaseIcon>
</template>

<script>
import { ARROW } from '@Core/defaults/icons';
import { GRAPHITE } from '@Core/assets/scss/_js-variables/colors.scss';
import BaseIcon from '@Core/components/Icons/BaseIcon';

export default {
    name: 'IconArrowPointerBlock',
    components: {
        BaseIcon,
    },
    props: {
        state: {
            type: String,
            default: ARROW.LEFT,
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
            drawingCommands: 'M18 7.415L13.42 12.005L18 16.595L16.59 18.005L10.59 12.005L16.59 6.005L18 7.415Z',
        };
    },
    computed: {
        iconTransform() {
            if (this.state === ARROW.RIGHT) return { transform: 'rotate(-180deg)' };

            return null;
        },
    },
};
</script>
