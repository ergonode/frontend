/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        class="info-hint"
        :title="hint">
        <IconTooltip size="16" />
    </span>
</template>

<script>
import IconTooltip from '~/components/Icon/Feedback/IconTooltip';

export default {
    name: 'InfoHint',
    components: {
        IconTooltip,
    },
    props: {
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
        padding: 0 6px;
    }
</style>
