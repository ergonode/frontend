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
            :transform="iconTransform"
            :points="points" />
    </IconBase>
</template>

<script>
import { Arrow } from '~/model/icons/Arrow';
import IconBase from '~/components/Icon/IconBase';

export default {
    name: 'IconArrowPointer',
    components: {
        IconBase,
    },
    data() {
        return {
            points: '20 11 7.8 11 13.4 5.4 12 4 4 12 12 20 13.4 18.6 7.8 13 20 13',
            size: 24,
        };
    },
    props: {
        state: {
            type: String,
            default: Arrow.LEFT,
        },
        fillColor: {
            type: String,
            default: '#5C5F65',
        },
    },
    computed: {
        iconTransform() {
            if (this.state === Arrow.RIGHT) return 'translate(12, 12) rotate(-180) translate(-12, -12)';

            return null;
        },
    },
};
</script>
