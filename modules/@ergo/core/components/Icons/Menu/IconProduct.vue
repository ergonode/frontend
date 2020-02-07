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
            drawingCommands: 'M12.0026 1.75L14.997 3.43847L6.99846 7.93847L4 6.25L12.0026 1.75ZM13 12.6653L13.8884 12.146L21 8V17.3347L13 22V12.6653ZM20.0002 6.25006L16.5493 4.33541L8.55078 8.83541L9.00716 9.06548L12.0016 10.7501L14.9801 9.07718L20.0002 6.25006ZM6.05748 12.1715L7.54065 12.9414V10.6527L11 12.6653V22L3 17.3347V8L6.05748 9.77824V12.1715Z',
        };
    },
};
</script>
