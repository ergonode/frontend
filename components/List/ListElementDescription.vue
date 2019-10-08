/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template functional>
    <div :class="['element-description', { 'element-description--short': props.short }]">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'ListElementDescription',
    props: {
        short: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .element-description {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        overflow: hidden;

        &--short {
            flex: 0 0 70%;
        }
    }
</style>
