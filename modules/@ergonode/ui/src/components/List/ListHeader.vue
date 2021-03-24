/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="list-header">
        <span
            class="list-header__title"
            v-text="title" />
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ListHeader',
    props: {
        /**
         * The title of the component
         */
        title: {
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
        grid-template-rows: max-content;
        grid-template-columns: 1fr max-content;
        grid-gap: 12px 16px;
        align-items: center;
        padding: 12px;

        &__title {
            grid-column: 1 / 3;
            grid-row: 1;
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_16_24;
            word-break: break-word;
        }
    }
</style>
