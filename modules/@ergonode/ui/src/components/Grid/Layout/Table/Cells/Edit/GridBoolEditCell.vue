/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Toggler
        @click.native.prevent
        :value="Boolean(value)"
        :disabled="disabled" />
</template>

<script>

export default {
    name: 'GridBoolEditCell',
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
    .toggler {
        padding: 0 8px;
    }
</style>
