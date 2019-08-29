/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IconBase
        :width="size"
        :height="size"
        :icon-color="fillColor">
        <path :d="drawingCommands" />
    </IconBase>
</template>

<script>
import IconBase from '~/components/Icon/IconBase';

export default {
    name: 'IconLock',
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
            drawingCommands: 'M14.6666667,11.0168316 L14.6666667,9.66666667 C14.6666667,7.9083693 13.4093643,7 11.9998192,7 C10.5902741,7 9.33333333,7.9083693 9.33333333,9.66666667 L9.33333333,11.0168316 L8,11.0168316 L8,17 L16,17 L16,11.0168316 L14.6666667,11.0168316 Z M10.3333333,9.66666667 C10.3333333,8.71984241 10.8910146,7.95594129 11.9998493,7.95594129 C13.1086841,7.95594129 13.6666667,8.71981224 13.6666667,9.66666667 L13.6666667,11 L10.3333333,11 L10.3333333,9.66666667 Z',
        };
    },
};
</script>
