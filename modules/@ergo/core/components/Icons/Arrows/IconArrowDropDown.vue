/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
import Icon from '@Core/components/Icons/Icon';
import { ARROW } from '@Core/defaults/icons';

export default {
    name: 'IconArrowDropDown',
    components: {
        Icon,
    },
    inheritAttrs: false,
    computed: {
        points() {
            return '8 10 12 14 16 10';
        },
        iconTransform() {
            if (this.$attrs.state === ARROW.UP) return { transform: 'rotate(-180deg)' };

            return null;
        },
    },
};
</script>
