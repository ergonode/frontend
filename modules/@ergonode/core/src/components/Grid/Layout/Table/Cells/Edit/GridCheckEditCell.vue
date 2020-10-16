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

import CheckBox from '@Core/components/CheckBox/CheckBox';

export default {
    name: 'GridCheckEditCell',
    components: {
        CheckBox,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: [
                Boolean,
                Number,
            ],
            default: false,
        },
        /**
         * Determinate if the component is disabled
         */
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
