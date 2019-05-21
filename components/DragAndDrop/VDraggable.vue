/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :id="index"
        :class="{'draggable': isDragged}"
        :draggable="isDraggable"
        @dragstart="dragStart"
        @dragend="dragEnd">
        <slot
            :is-dragged="isDragged" />
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'VDraggable',
    props: {
        index: {
            type: [String, Number],
            required: true,
        },
        isDraggable: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data: () => ({
        isDragged: false,
    }),
    methods: {
        ...mapActions('draggable', [
            'setDraggedElement',
        ]),
        dragStart(event) {
            this.isDragged = true;
            event.dataTransfer.setData('text/plain', event.target.id);
            this.$emit('onDragStart', event);
        },
        dragEnd(event) {
            this.isDragged = false;
            event.dataTransfer.clearData();
            this.$emit('onDragEnd', event);
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/draggable.scss";
</style>
