/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionBaseButton
        :options="options"
        :dismissible="dismissible"
        :fixed-content="fixedContent"
        @focus="onFocus"
        @hover="onHover"
        @input="onSelect">
        <template #button>
            <Button
                :theme="theme"
                :size="size"
                :title="title"
                :disabled="disabled">
                <template #prepend="{ color }">
                    <!--
                        @slot Prepend element - icon recommended
                          @binding {string} color color of an element
                      -->
                    <slot
                        name="prepend"
                        :color="color" />
                </template>
                <template #append="{ color }">
                    <!--
                        @slot Append element - icon recommended
                          @binding {string} color color of an element
                      -->
                    <slot
                        name="append"
                        :color="color">
                        <IconArrowDropDown
                            :fill-color="color"
                            :state="iconArrowState" />
                    </slot>
                </template>
            </Button>
        </template>
        <template #option="{ option }">
            <!--
                @slot List option
                  @binding {object} option
              -->
            <slot
                name="option"
                :option="option" />
        </template>
    </ActionBaseButton>
</template>

<script>
import ActionBaseButton from '@Core/components/Buttons/ActionBaseButton';
import Button from '@Core/components/Buttons/Button';
import IconArrowDropDown from '@Core/components/Icons/Arrows/IconArrowDropDown';
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

export default {
    name: 'ActionButton',
    components: {
        ActionBaseButton,
        Button,
        IconArrowDropDown,
    },
    props: {
        /**
         * The theme of the button
         * @values primary, secondary
         */
        theme: {
            type: String,
            default: THEME.PRIMARY,
            validator: value => Object.values(THEME).indexOf(value) !== -1,
        },
        /**
         * The size of the button
         * @values regular, small, tiny
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => Object.values(SIZE).indexOf(value) !== -1,
        },
        /**
         * The title of the button
         * @values primary, secondary
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * The disabled state of the button
         * @values primary, secondary
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * The dismissible state of the dropdown
         * @values primary, secondary
         */
        dismissible: {
            type: Boolean,
            default: true,
        },
        /**
         * The options of the dropdown
         */
        options: {
            type: Array,
            default: () => [
            ],
        },
        /**
         * The flag which tells if the dropdown has fixed content to it's parent width
         */
        fixedContent: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isFocused: false,
            isHovered: false,
        };
    },
    computed: {
        iconArrowState() {
            return this.isFocused ? ARROW.UP : ARROW.DOWN;
        },
    },
    methods: {
        onHover(isHovered) {
            this.isHovered = isHovered;
        },
        onFocus(isFocused) {
            this.isFocused = isFocused;
            this.$emit('focus', isFocused);
        },
        onSelect(option) {
            this.$emit('input', option);
        },
    },
};
</script>
