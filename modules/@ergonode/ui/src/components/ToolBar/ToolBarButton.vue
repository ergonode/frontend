/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button :class="classes">
        <slot />
    </button>
</template>

<script>
export default {
    name: 'ToolBarButton',
    props: {
        /**
         * Determines if component is selected
         */
        selected: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return [
                'tool-bar-button',
                {
                    'tool-bar-button--selected': this.selected,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .tool-bar-button {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        padding: 0 24px;
        background-color: $GRAPHITE_COAL;
        cursor: pointer;
        outline: none;

        &:hover, &--selected {
            background-color: $GRAPHITE_DARK;
        }
    }
</style>
