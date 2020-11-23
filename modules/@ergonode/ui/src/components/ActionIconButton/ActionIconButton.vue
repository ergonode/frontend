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
            <IconButton
                :theme="theme"
                :size="size"
                :disabled="disabled">
                <template #icon>
                    <!--
                        @slot Icon element
                        @binding {string} color color of an element
                    -->
                    <slot
                        name="icon"
                        :color="iconFillColor" />
                </template>
            </IconButton>
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
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    GRAPHITE,
    GREEN,
    GREY_DARK,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import ActionBaseButton from '@UI/components/ActionButton/ActionBaseButton';
import IconButton from '@UI/components/IconButton/IconButton';

/**
 * `ActionIconButton` is an `ActionBaseButton` with a `IconButton` inside named slot `button`.
 * It's implementing `IconButton` props.
 */
export default {
    name: 'ActionIconButton',
    components: {
        ActionBaseButton,
        IconButton,
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
        iconFillColor() {
            if (this.theme !== THEME.PRIMARY) {
                if (this.disabled) {
                    return GREY_DARK;
                }
                if (this.isHovered || this.isFocused) {
                    return GREEN;
                }
                return GRAPHITE;
            }

            return WHITE;
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
