/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IconArrowSingle :state="rightState" />
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';

export default {
    name: 'JSONSchemaFormTableRowArrowWidget',
    computed: {
        rightState() {
            return ARROW.RIGHT;
        },
    },
};
</script>
