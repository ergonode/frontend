/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <RadioButton
        @click.native.prevent
        :value="value"
        :disabled="disabled" />
</template>

<script>

import RadioButton from '@UI/components/RadioButton/RadioButton';

export default {
    name: 'GridRadioEditCell',
    components: {
        RadioButton,
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
    .radio-button {
        padding: 3px;
    }
</style>
