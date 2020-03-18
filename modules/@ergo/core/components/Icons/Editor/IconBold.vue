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
    name: 'IconBold',
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
            drawingCommands: 'M15.5262927,11.7899768 C16.4830411,11.1149776 17.1621572,10.0249944 17.1621572,8.99997991 C17.1621572,6.74501368 15.4321376,5 13.1964407,5 L7,5 L7,19 L13.9797037,19 C16.0567404,19 17.6579356,17.2999863 17.6579356,15.2100199 C17.6579356,13.6900059 16.8003151,12.3949917 15.5262927,11.7899768 Z M9.97429897,7.49998158 L12.9485979,7.49998158 C13.7715028,7.49998158 14.4357474,8.16996521 14.4357474,8.99998158 C14.4357474,9.82999461 13.7715028,10.4999816 12.9485979,10.4999816 L9.97429897,10.4999816 L9.97429897,7.49998158 Z M13.4442835,16.4999749 L9.97429897,16.4999749 L9.97429897,13.4999749 L13.4443299,13.4999749 C14.2672348,13.4999749 14.9314794,14.1699585 14.9314794,14.9999749 C14.9314794,15.8299879 14.2671883,16.4999749 13.4442835,16.4999749 Z',
        };
    },
};
</script>
