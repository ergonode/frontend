/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Toggler
        @click.native.prevent
        :value="Boolean(value)"
        :disabled="disabled" />
</template>

<script>

import Toggler from '@Core/components/Toggler/Toggler';

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
