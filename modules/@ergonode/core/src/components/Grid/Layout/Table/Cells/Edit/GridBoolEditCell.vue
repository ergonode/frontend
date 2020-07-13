/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Toggler
        @click.native.prevent
        :value="Boolean(value)"
        :disabled="isDisabled" />
</template>

<script>

import Toggler from '@Core/components/Inputs/Toggler/Toggler';

export default {
    name: 'GridBoolEditCell',
    components: {
        Toggler,
    },
    props: {
        value: {
            type: [
                Boolean,
                Number,
            ],
            default: false,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
