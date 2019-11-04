/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        class="element-hint"
        :title="hint">
        <slot />
    </span>
</template>

<script>
export default {
    name: 'ListElementHintIcon',
    props: {
        hint: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .element-hint {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        min-width: 24px;
        min-height: 24px;
        margin-right: 4px;
    }
</style>
