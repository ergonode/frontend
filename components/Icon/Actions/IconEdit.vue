/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IconBase
        :width="size"
        :height="size"
        :icon-color="fillColor">
        <path
            :d="drawingCommands"
            :transform="transform" />
    </IconBase>
</template>

<script>
import { GRAPHITE } from '~/assets/scss/_variables/_colors.scss';
import IconBase from '~/components/Icon/IconBase';

export default {
    name: 'IconEdit',
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
    },
    data() {
        return {
            drawingCommands: 'M14,6 L10,6 L10,4 C10,3.44771525 10.4477153,3 11,3 L13,3 C13.5522847,3 14,3.44771525 14,4 L14,6 Z M14,8 L14,18.5 L12,21 L10,18.5 L10,8 L14,8 Z',
            transform: 'translate(12, 12) rotate(-315) translate(-12, -12)',
        };
    },
};
</script>
