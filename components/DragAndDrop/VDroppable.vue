/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :id="index"
        @dragover="dragOver"
        @drop="drop"
        @dragleave="dragLeave"
        @dragenter="dragEnter">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'VDroppable',
    props: {
        index: {
            type: Object,
            required: true,
        },
        onDroppedComponent: {
            type: Function,
            required: false,
            default: () => {},
        },
    },
    methods: {
        drop(event) {
            const droppedComponentData = event.dataTransfer.getData('text/plain');
            event.preventDefault();

            this.$emit('isHovered', false);

            this.onDroppedComponent(droppedComponentData, this.index);
            event.dataTransfer.clearData();
        },
        dragOver(event) {
            const localEvent = event;
            localEvent.preventDefault();
            // Set the dropEffect to move
            localEvent.dataTransfer.dropEffect = 'move';
        },
        dragLeave() {
            this.$emit('isHovered', false);
        },
        dragEnter() {
            this.$emit('isHovered', true);
        },
    },
};
</script>
