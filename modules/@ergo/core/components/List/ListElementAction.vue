/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['element-action', {'element-action--small': small}]">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'ListElementAction',
    props: {
        small: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .element-action {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 4px;
    }
</style>
