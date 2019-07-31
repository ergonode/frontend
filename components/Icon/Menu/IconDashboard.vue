/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IconBase
        :width="size"
        :height="size"
        :icon-color="fillColor">
        <polygon :points="points" />
    </IconBase>
</template>

<script>
import IconBase from '~/components/Icon/IconBase';

export default {
    name: 'IconDashboard',
    components: {
        IconBase,
    },
    props: {
        fillColor: {
            type: String,
            default: '#5C5F65',
        },
        size: {
            type: [String, Number],
            default: 24,
        },
    },
    data() {
        return {
            points: '10 21 10 15 14 15 14 21 19 21 19 13 22 13 12 4 2 13 5 13 5 21',
        };
    },
};
</script>
