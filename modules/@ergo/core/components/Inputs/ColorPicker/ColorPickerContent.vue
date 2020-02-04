/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="color-picker-content"
        :style="colorPickerContentTemplateStyle">
        <div
            v-for="(color, index) in options"
            :key="color"
            :class="['color', {'color--selected': colorIndex === index}]"
            :style="{backgroundColor: color}"
            @click="onSelect(color, index)" />
    </div>
</template>

<script>
export default {
    name: 'ColorPickerContent',
    props: {
        value: {
            type: String,
            default: null,
        },
        options: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            colorIndex: null,
        };
    },
    computed: {
        colorPickerContentTemplateStyle() {
            return {
                gridTemplateColumns: `repeat(${Math.ceil(this.options.length / 5)}, 24px)`,
            };
        },
    },
    created() {
        this.colorIndex = this.options.findIndex(color => color === this.value);
    },
    methods: {
        onSelect(color, index) {
            this.colorIndex = index;
            this.$emit('input', color);
        },
    },
};
</script>

<style lang="scss" scoped>
    .color-picker-content {
        display: grid;
        grid-auto-rows: 24px;
        grid-gap: 4px;
        margin: 8px;

        .color {
            $color: &;

            position: relative;

            &::after {
                position: absolute;
                top: -4px;
                left: -4px;
                width: calc(100% + 4px);
                height: calc(100% + 4px);
                border: 2px solid $GREEN;
                opacity: 0;
                content: "";
            }

            &--selected {
                margin: 4px;

                &::after {
                    opacity: 1;
                }
            }
        }
    }
</style>
