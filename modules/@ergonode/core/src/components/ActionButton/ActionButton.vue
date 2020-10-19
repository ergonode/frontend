/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ActionBaseButton
        :options="options"
        :dismissible="dismissible"
        :disabled="disabled"
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
import ActionBaseButton from '@Core/components/ActionButton/ActionBaseButton';
import Button from '@Core/components/Button/Button';
import IconArrowDropDown from '@Core/components/Icons/Arrows/IconArrowDropDown';
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';

/**
 * `ActionButton` is an `ActionBaseButton` with a `Button` inside named slot `button`.
 * It's implementing `Button` props.
 */
export default {
    name: 'ActionButton',
    components: {
        ActionBaseButton,
        Button,
        IconArrowDropDown,
    },
    props: {
        /**
         * The theme of the component
         */
        theme: {
            type: String,
            default: THEME.PRIMARY,
            validator: value => Object.values(THEME).indexOf(value) !== -1,
        },
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => Object.values(SIZE).indexOf(value) !== -1,
        },
        /**
         * The title of the component
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * The dismissible flag is telling if we can toggle between active an inactive state
         */
        dismissible: {
            type: Boolean,
            default: true,
        },
        /**
         * Component variances that user can choose from
         */
        options: {
            type: Array,
            default: () => [],
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
