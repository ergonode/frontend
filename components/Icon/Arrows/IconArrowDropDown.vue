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
import IconBase from '~/components/Icon/IconBase';

export default {
    name: 'IconArrowDropDown',
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
            points: '8 10 12 14 16 10',
        };
    },
    computed: {
        iconTransform() {
            if (this.state === Arrow.UP) return 'translate(12, 12) rotate(-180) translate(-12, -12)';

            return null;
        },
    },
};
</script>
