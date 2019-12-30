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
    name: 'IconProduct',
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
            drawingCommands: 'M13.3941909,12.1576763 L20.5684647,8.01659751 L20.5684647,17.340249 L12.4979253,22 L12.4979253,12.6763485 L13.3941909,12.1576763 Z M14.8547718,3.7966805 L6.56431535,8.58506224 L3.45643154,6.78838174 L11.7510373,2 L14.8547718,3.7966805 Z M20.0414938,6.78838174 L14.8381743,9.7966805 L11.7510373,11.5767635 L8.6473029,9.78423237 L8.17427386,9.53941909 L16.4647303,4.75103734 L20.0414938,6.78838174 Z M7.54771784,12.966805 L7.54771784,10.6970954 L11.0124481,12.6929461 L11.0124481,21.9502075 L3,17.3236515 L3,8.06639004 L6.06224066,9.82987552 L6.06224066,12.2033195 L7.54771784,12.966805 Z',
        };
    },
};
</script>
