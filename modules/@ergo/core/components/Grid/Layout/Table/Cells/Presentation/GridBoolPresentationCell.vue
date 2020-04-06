/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="bool-presentation-cell">
        <Toggler
            :value="value"
            :disabled="isDisabled" />
    </div>
</template>

<script>

import Toggler from '@Core/components/Inputs/Toggler/Toggler';

export default {
    name: 'GridBoolPresentationCell',
    components: { Toggler },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .bool-presentation-cell {
        display: flex;
        align-items: center;
        padding: 8px;
    }
</style>
