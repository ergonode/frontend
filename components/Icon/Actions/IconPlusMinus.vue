/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IconBase
        :width="size"
        :height="size"
        :icon-color="fillColor">
        <polygon :points="iconPoints" />
    </IconBase>
</template>

<script>
import { ACTION } from '~/defaults/icons';
import { GRAPHITE } from '~/assets/scss/_variables/_colors.scss';
import IconBase from '~/components/Icon/IconBase';

export default {
    name: 'IconPlusMinus',
    components: {
        IconBase,
    },
    props: {
        fillColor: {
            type: String,
            default: GRAPHITE,
        },
        size: {
            type: [String, Number],
            default: '24',
        },
        state: {
            type: String,
            default: ACTION.PLUS,
        },
    },
    computed: {
        iconPoints() {
            if (this.state === ACTION.MINUS) return '5 11 19 11 19 13 5 13 5 11';
            return '11 5 11 11 5 11 5 13 11 13 11 19 13 19 13 13 19 13 19 11 13 11 13 5';
        },
    },
};
</script>
