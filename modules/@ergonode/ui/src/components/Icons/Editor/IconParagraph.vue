/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Icon v-bind="$attrs">
        <path :d="drawingCommands" />
    </Icon>
</template>

<script>

export default {
    name: 'IconParagraph',
    inheritAttrs: false,
    computed: {
        drawingCommands() {
            return 'M9.37184 5V5.00725C7.78917 5.04484 6.97453 5.44291 6.20014 6.13946C5.4472 6.79044 5 7.78754 5 9.00662C5 10.2486 5.36611 11.2243 6.05748 11.9364C7.11818 13.0668 8.5 13.5 11 13V19H13V7H15V19H17V7H19V5H9.37184Z';
        },
    },
};
</script>
