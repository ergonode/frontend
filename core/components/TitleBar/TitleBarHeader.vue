/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="title-bar-header">
        <slot name="prepend" />
        <h1
            class="title-bar-header__title"
            v-text="title" />
        <slot name="append" />
    </div>
</template>

<script>

export default {
    name: 'TitleBarHeader',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .title-bar-header {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        grid-column-gap: 16px;

        &__title {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_24_32;
        }
    }
</style>
