/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <label
        class="info-hint"
        :title="hint">
        <IconError size="16" />
    </label>
</template>

<script>
import IconError from '~/components/Icon/Feedback/IconError';

export default {
    name: 'ErrorHint',
    components: {
        IconError,
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
