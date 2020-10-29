/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="dragged-element">
        <IconDragDrop />
        <span
            class="dragged-element__label"
            v-text="label" />
    </div>
</template>

<script>
import IconDragDrop from '@Core/components/Icons/Actions/IconDragDrop';

export default {
    name: 'DraggedElement',
    components: {
        IconDragDrop,
    },
    props: {
        /**
         * The label is a text caption or description for the component
         */
        label: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .dragged-element {
        display: flex;
        align-items: center;
        width: max-content;
        padding: 4px;
        background-color: $WHITESMOKE;

        &__label {
            margin: 0 4px;
            color: $GRAPHITE_DARK;
            font: $FONT_BOLD_12_16;
        }
    }
</style>
