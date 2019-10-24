/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IconBase
        :width="size"
        :height="size"
        :icon-color="fillColor">
        <polygon
            :points="points"
            :transform="iconTransform" />
    </IconBase>
</template>

<script>
import { Arrow } from '~/model/icons/Arrow';
import { GRAPHITE } from '~/assets/scss/_variables/_colors.scss';
import IconBase from '~/components/Icon/IconBase';

export default {
    name: 'IconArrowSingle',
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
            if (this.state === Arrow.LEFT) return 'translate(12, 12.005) rotate(-270) translate(-12, -12.005)';
            if (this.state === Arrow.RIGHT) return 'translate(12, 12.005) rotate(-90) translate(-12, -12.005)';
            if (this.state === Arrow.UP) return 'translate(12, 12.005) rotate(-180) translate(-12, -12.005)';

            return null;
        },
    },
};
</script>
