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
import { GRAPHITE } from '@Core/assets/scss/_js-variables/colors.scss';
import BaseIcon from '@Core/components/Icons/BaseIcon';

export default {
    name: 'IconCancel',
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
            default: '24',
        },
    },
    data() {
        return {
            drawingCommands: 'M6 12C6 8.682 8.682 6 12 6C15.318 6 18 8.682 18 12C18 15.318 15.318 18 12 18C8.682 18 6 15.318 6 12ZM14.3933 15.3333L15.3333 14.3933L12.94 12L15.3333 9.60667L14.3933 8.66667L12 11.06L9.60667 8.66667L8.66667 9.60667L11.06 12L8.66667 14.3933L9.60667 15.3333L12 12.94L14.3933 15.3333Z',
        };
    },
};
</script>
