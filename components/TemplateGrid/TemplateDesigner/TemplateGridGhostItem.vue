<template>
    <div
        :class="['ghost-item', draggableStateClasses]"
        draggable
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragover="onDragOver"
        @drop="onDrop" />
</template>

<script>
export default {
    name: 'TemplateGridGhostItem',
    props: {
        position: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isInside: false,
        };
    },
    computed: {
        draggableStateClasses() {
            return {
                'ghost-item--inside': this.isInside,
            };
        },
    },
    methods: {
        onDrop() {
            this.isInside = false;
            this.$emit('drop', this.position);
        },
        onDragOver(event) {
            event.preventDefault();
        },
        onDragEnter() {
            this.isInside = true;
        },
        onDragLeave() {
            this.isInside = false;
        },
    },
};
</script>

<style lang="scss" scoped>
    .ghost-item {
        &--inside {
            background-color: $success;
        }
    }
</style>
