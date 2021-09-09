/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        class="info-hint"
        :title="hint">
        <IconTooltip />
    </span>
</template>

<script>
import IconTooltip from '@UI/components/Icons/Feedback/IconTooltip';

export default {
    name: 'InfoHint',
    components: {
        IconTooltip,
    },
    props: {
        /**
         *  The hint is a tip for the component
         */
        hint: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .info-hint {
        display: flex;
        align-items: center;
        cursor: help;
    }
</style>
