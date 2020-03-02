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
        <polygon :points="points" />
    </BaseIcon>
</template>

<script>
import { ARROW } from '@Core/defaults/icons';
import { GRAPHITE } from '@Core/assets/scss/_js-variables/colors.scss';
import BaseIcon from '@Core/components/Icons/BaseIcon';

export default {
    name: 'IconArrowSingle',
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
            points: '16.59 8.3 12 12.88 7.41 8.3 6 9.71 12 15.71 18 9.71',
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
