/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        class="link-button"
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
        title: {
            type: String,
            required: true,
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

        &:hover:not(:disabled), &:focus {
            box-shadow: $ELEVATOR_HOVER_FOCUS;
        }
    }
</style>
