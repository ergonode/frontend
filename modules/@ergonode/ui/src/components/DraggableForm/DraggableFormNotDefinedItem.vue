/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="draggable-form-not-defined-item">
        <span v-text="title" />
    </div>
</template>

<script>
export default {
    name: 'DraggableFormNotDefinedItem',
    props: {
        title: {
            type: String,
            default: 'Draggable form item is not defined. Make sure you have defined it.',
        },
    },
};
</script>

<style lang="scss" scoped>
    .draggable-form-not-defined-item {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        border: $BORDER_1_GREY;
        padding: 8px;
        background-color: $WHITESMOKE;
        font: $FONT_MEDIUM_12_16;
    }
</style>
