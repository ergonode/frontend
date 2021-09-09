/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IconArrowSingle :state="rightState" />
</template>

<script>
import {
    ARROW,
} from '@Core/defaults/icons';
import IconArrowSingle from '@UI/components/Icons/Arrows/IconArrowSingle';

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
