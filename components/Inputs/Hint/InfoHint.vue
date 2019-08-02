/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <label
        class="info-hint"
        :title="hint">
        <IconTooltip />
    </label>
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
    }
</style>
