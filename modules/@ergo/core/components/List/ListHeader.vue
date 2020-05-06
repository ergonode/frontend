/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="list-header">
        <span
            class="list-header__title"
            v-text="header" />
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ListHeader',
    props: {
        header: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .list-header {
        position: relative;
        display: grid;
        grid-template-columns: auto max-content;
        row-gap: 12px;
        column-gap: 16px;
        align-items: center;
        padding: 12px;

        &__title {
            grid-column: 1;
            grid-row: 1;
            margin-left: 4px;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_16_24;
        }
    }
</style>
