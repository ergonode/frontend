/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <label
        class="hint"
        :title="hint">?</label>
</template>

<script>
export default {
    name: 'InfoHint',
    props: {
        hint: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .hint {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        width: 16px;
        height: 16px;
        background-color: $lightGraphite;
        color: $white;
        font: bold 13px/16px "Inter UI";
    }
</style>
