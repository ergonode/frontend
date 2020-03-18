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
    name: 'IconArrowDropDown',
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
            points: '8 10 12 14 16 10',
        };
    },
    computed: {
        iconTransform() {
            if (this.state === ARROW.UP) return { transform: 'rotate(-180deg)' };

            return null;
        },
    },
};
</script>
