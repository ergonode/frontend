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
    name: 'IconClose',
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
            default: '24',
        },
    },
    data() {
        return {
            points: '18 7.20857143 16.7914286 6 12 10.7914286 7.20857143 6 6 7.20857143 10.7914286 12 6 16.7914286 7.20857143 18 12 13.2085714 16.7914286 18 18 16.7914286 13.2085714 12',
        };
    },
};
</script>
