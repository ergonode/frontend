/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseIcon
        :width="size"
        :height="size"
        :icon-color="fillColor">
        <path :d="drawingCommands" />
    </BaseIcon>
</template>

<script>
import { GRAPHITE } from '~/assets/scss/_variables/_colors.scss';
import BaseIcon from '@Core/components/Icons/BaseIcon';

export default {
    name: 'IconActivity',
    components: {
        BaseIcon,
    },
    props: {
        fillColor: {
            type: String,
            default: GRAPHITE,
        },
        size: {
            type: [String, Number],
            default: 24,
        },
    },
    data() {
        return {
            drawingCommands: 'M10.425,8.85 L4.575,3 L3,4.575 L8.85,10.425 L10.425,8.85 Z M14.8125,3 L17.0625,5.25 L3,19.425 L4.575,21 L18.75,6.9375 L21,9.1875 L21,3 L14.8125,3 Z M15.15,13.575 L13.575,15.15 L17.0625,18.6375 L14.8125,20.8875 L21,20.8875 L21,14.7 L18.75,16.95 L15.15,13.575 Z',
        };
    },
};
</script>
