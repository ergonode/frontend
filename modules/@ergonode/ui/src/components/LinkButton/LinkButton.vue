/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        :class="['link-button', { 'link-button--disabled': disabled }]"
        type="button">
        <slot name="prepend" />
        <span v-text="title" />
        <slot name="append" />
    </button>
</template>

<script>
export default {
    name: 'LinkButton',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            required: true,
        },
        /**
         * The title of the component
         */
        disabled: {
            type: Boolean,
            required: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .link-button {
        position: relative;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        text-decoration-color: $GRAPHITE_DARK;
        text-decoration-line: underline;
        width: auto;
        border: none;
        padding: 0;
        margin: 0;
        outline: none;
        background-color: transparent;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_12_16;
        text-align: left;
        cursor: pointer;
        word-break: break-word;
        user-select: all;

        &--disabled {
            color: $GRAPHITE_LIGHT;
            text-decoration-color: $GRAPHITE_LIGHT;
            cursor: not-allowed;
        }
    }
</style>
