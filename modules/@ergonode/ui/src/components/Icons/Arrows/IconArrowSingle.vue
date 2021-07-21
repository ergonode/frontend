/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon
        v-bind="$attrs"
        :style="iconTransform">
        <polygon :points="points" />
    </Icon>
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';

export default {
    name: 'IconArrowSingle',
    inheritAttrs: false,
    computed: {
        points() {
            return '16.59 8.3 12 12.88 7.41 8.3 6 9.71 12 15.71 18 9.71';
        },
        iconTransform() {
            if (this.$attrs.state === ARROW.LEFT) {
                return {
                    transform: 'rotate(-270deg)',
                };
            }
            if (this.$attrs.state === ARROW.RIGHT) {
                return {
                    transform: 'rotate(-90deg)',
                };
            }
            if (this.$attrs.state === ARROW.UP) {
                return {
                    transform: 'rotate(-180deg)',
                };
            }

            return null;
        },
    },
};
</script>
