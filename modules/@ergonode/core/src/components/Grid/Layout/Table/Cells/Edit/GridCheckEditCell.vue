/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CheckBox
        @click.native.prevent
        :value="value"
        :disabled="disabled" />
</template>

<script>

import CheckBox from '@Core/components/Inputs/CheckBox';

export default {
    name: 'GridCheckEditCell',
    components: {
        CheckBox,
    },
    props: {
        value: {
            type: [
                Boolean,
                Number,
            ],
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .checkbox {
        padding: 4px;
    }
</style>
