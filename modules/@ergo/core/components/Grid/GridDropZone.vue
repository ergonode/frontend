/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="[
            'grid-drop-zone',
            {
                'grid-drop-zone--horizontal': isHorizontal,
            },
        ]">
        <div
            :class="[
                'grid-drop-zone__container',
                {
                    'grid-drop-zone__container--hovered': isHovered,
                }
            ]"
            @dragenter="onDragEnter"
            @dragleave="onDragLeave"
            @dragover="onDragOver"
            @drop="onDrop">
            <div class="grid-drop-zone__body">
                <slot
                    name="icon"
                    :color="addIconFillColor">
                    <IconAddColumn :fill-color="addIconFillColor" />
                </slot>
                <span v-text="title" />
            </div>
        </div>
    </div>
</template>

<script>
import {
    GRAPHITE,
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import IconAddColumn from '@Core/components/Icons/Actions/IconAddColumn';
import { LayoutOrientation } from '@Core/defaults/layout';

export default {
    name: 'GridDropZone',
    components: {
        IconAddColumn,
    },
    props: {
        title: {
            type: String,
            default: 'ADD COLUMN',
        },
        orientation: {
            type: String,
            default: LayoutOrientation.VERTICAL,
            validator: value => Object.values(LayoutOrientation).indexOf(value) !== -1,
        },
    },
    data() {
        return {
            isHovered: false,
        };
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
        addIconFillColor() {
            return this.isHovered ? WHITE : GRAPHITE;
        },
        isHorizontal() {
            return this.orientation === LayoutOrientation.HORIZONTAL;
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
.grid-drop-zone {
    $dropzone: &;

    position: absolute;
    z-index: $Z_INDEX_MAX;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: $WHITE;

    &__container {
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

        &--hovered {
            background-color: $GREEN;
            color: $WHITE;
        }
    }

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
</style>
