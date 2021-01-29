/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <div
            :style="containerStyles"
            class="container"
            @dragenter="onDragEnter"
            @dragleave="onDragLeave"
            @dragover="onDragOver"
            @drop="onDrop">
            <div class="drop-zone__body">
                <slot
                    name="icon"
                    :color="addIconFillColor" />
                <span v-text="title" />
            </div>
        </div>
    </div>
</template>

<script>
import {
    ORIENTATION,
} from '@Core/defaults/layout';
import {
    GRAPHITE,
    GREEN,
    WHITE,
    WHITESMOKE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'DropZone',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: 'ADD',
        },
        /**
         * Determines about background color on hover
         */
        hoverBackgroundColor: {
            type: String,
            default: GREEN,
            validator: value => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
        /**
         * Determines position of body components; vertical / horizontal
         */
        orientation: {
            type: String,
            default: ORIENTATION.VERTICAL,
            validator: value => Object.values(ORIENTATION).indexOf(value) !== -1,
        },
    },
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        classes() {
            return [
                'drop-zone',
                {
                    'drop-zone--horizontal': this.isHorizontal,
                },
            ];
        },
        whiteColor() {
            return WHITE;
        },
        containerStyles() {
            return this.isHovered
                ? {
                    backgroundColor: this.hoverBackgroundColor,
                    color: WHITE,
                }
                : {
                    backgroundColor: WHITESMOKE,
                    color: GRAPHITE,
                };
        },
        addIconFillColor() {
            return this.isHovered ? WHITE : GRAPHITE;
        },
        isHorizontal() {
            return this.orientation === ORIENTATION.HORIZONTAL;
        },
    },
    methods: {
        onDragEnter() {
            this.isHovered = true;
        },
        onDragLeave() {
            this.isHovered = false;
        },
        onDragOver(event) {
            event.preventDefault();
        },
        onDrop(event) {
            event.preventDefault();

            this.isHovered = false;

            this.$emit('drop', event.dataTransfer.getData('text/plain'));
        },
    },
};
</script>

<style lang="scss" scoped>
.drop-zone {
    $dropzone: &;

    position: absolute;
    z-index: $Z_INDEX_MAX;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: $WHITE;

    &__body {
        display: grid;
        grid-auto-flow: row;
        grid-gap: 8px;
        justify-items: center;
        align-items: center;
        pointer-events: none;
    }

    &--horizontal {
        #{$dropzone}__body {
            grid-auto-flow: column;
        }
    }
}

.container {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin: 8px;
    box-sizing: border-box;
    background-color: $GREY_LIGHT;
    box-shadow: $ELEVATOR_HOLE;
    color: $GRAPHITE;
    font: $FONT_BOLD_12_16;
}
</style>
