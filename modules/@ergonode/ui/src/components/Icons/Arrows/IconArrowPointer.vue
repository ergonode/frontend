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
    name: 'IconArrowPointer',
    inheritAttrs: false,
    computed: {
        points() {
            return '20 11 7.8 11 13.4 5.4 12 4 4 12 12 20 13.4 18.6 7.8 13 20 13';
        },
        iconTransform() {
            if (this.state === ARROW.RIGHT) {
                return {
                    transform: 'rotate(-180deg)',
                };
            }

            return null;
        },
    },
};
</script>
