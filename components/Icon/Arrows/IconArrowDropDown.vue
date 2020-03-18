/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseIcon
        :width="size"
        :height="size"
        :icon-color="fillColor">
        <polygon
            :points="points"
            :transform="iconTransform" />
    </BaseIcon>
</template>

<script>
import { ARROW } from '~/defaults/icons';
import { GRAPHITE } from '~/assets/scss/_variables/_colors.scss';
import BaseIcon from '~/components/Icon/BaseIcon';

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
            if (this.state === ARROW.UP) return 'translate(12, 12) rotate(-180) translate(-12, -12)';

            return null;
        },
    },
};
</script>
