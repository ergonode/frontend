/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Resizer
        v-bind="$attrs"
        v-on="$listeners" />
</template>

<script>
import Resizer from '@UI/components/Resizer/Resizer';

export default {
    name: 'GridColumnResizer',
    components: {
        Resizer,
    },
    inheritAttrs: false,
};
</script>
