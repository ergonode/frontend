/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon v-bind="$attrs">
        <polygon :points="iconPoints" />
    </Icon>
</template>

<script>
import Icon from '@Core/components/Icons/Icon';
import { ACTION } from '@Core/defaults/icons';

export default {
    name: 'IconPlusMinus',
    components: {
        Icon,
    },
    inheritAttrs: false,
    computed: {
        iconPoints() {
            if (this.$attrs.state === ACTION.MINUS) return '5 11 19 11 19 13 5 13 5 11';
            return '11 5 11 11 5 11 5 13 11 13 11 19 13 19 13 13 19 13 19 11 13 11 13 5';
        },
    },
};
</script>
