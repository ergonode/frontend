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
    name: 'IconAttributes',
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
            drawingCommands: 'M20.6190476,10.5238095 L19.1904762,10.5238095 L19.1904762,6.71428571 C19.1904762,5.66666667 18.3333333,4.80952381 17.2857143,4.80952381 L13.4761905,4.80952381 L13.4761905,3.38095238 C13.4761905,2.04761905 12.4285714,1 11.0952381,1 C9.76190476,1 8.71428571,2.04761905 8.71428571,3.38095238 L8.71428571,4.80952381 L4.9047619,4.80952381 C3.85714286,4.80952381 3,5.66666667 3,6.71428571 L3,10.3333333 L4.42857143,10.3333333 C5.85714286,10.3333333 7,11.4761905 7,12.9047619 C7,14.3333333 5.85714286,15.4761905 4.42857143,15.4761905 L3,15.4761905 L3,19.0952381 C3,20.1428571 3.85714286,21 4.9047619,21 L8.52380952,21 L8.52380952,19.5714286 C8.52380952,18.1428571 9.66666667,17 11.0952381,17 C12.5238095,17 13.6666667,18.1428571 13.6666667,19.5714286 L13.6666667,21 L17.2857143,21 C18.3333333,21 19.1904762,20.1428571 19.1904762,19.0952381 L19.1904762,15.2857143 L20.6190476,15.2857143 C21.952381,15.2857143 23,14.2380952 23,12.9047619 C23,11.5714286 21.952381,10.5238095 20.6190476,10.5238095 Z',
        };
    },
};
</script>
