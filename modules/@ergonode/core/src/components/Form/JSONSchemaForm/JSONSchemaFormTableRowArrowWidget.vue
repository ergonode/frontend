/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IconArrowSingle :state="rightState" />
</template>

<script>
import IconArrowSingle from '@Core/components/Icons/Arrows/IconArrowSingle';
import {
    ARROW,
} from '@Core/defaults/icons';

export default {
    name: 'JSONSchemaFormTableRowArrowWidget',
    components: {
        IconArrowSingle,
    },
    computed: {
        rightState() {
            return ARROW.RIGHT;
        },
    },
};
</script>
