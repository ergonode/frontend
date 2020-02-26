/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :class="menuButtonClasses"
        v-bind="$attrs"
        ref="activator"
        @click.native="onClick"
        @mouseenter.native="onMouseEnter"
        @mouseleave.native="onMouseLeave">
        <template #append="{ color }">
            <slot
                name="icon"
                :fillColor="iconFillColor"
                :is-hovered="isHovered">
                <IconArrowDropDown
                    :state="iconArrowState"
                    :fill-color="color" />
            </slot>
        </template>
        <FadeTransition>
            <DropDown
                v-if="isFocused"
                :offset="dropDownOffset"
                :fixed="fixedContent">
                <template #body>
                    <List>
                        <ListElement
                            v-for="(option, index) in options"
                            :key="index"
                            :small="true"
                            @click.native.prevent="onSelectedValue(index)">
                            <slot
                                name="option"
                                :option="option">
                                <ListElementDescription>
                                    <ListElementTitle
                                        :title="option"
                                        :small="true" />
                                </ListElementDescription>
                            </slot>
                        </ListElement>
                    </List>
                </template>
            </DropDown>
        </FadeTransition>
    </Button>
</template>
<script>

import { ARROW } from '@Core/defaults/icons';
import { THEMES } from '@Core/defaults/buttons';
import {
    GREEN, GRAPHITE, WHITE, GREY_DARK,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Button from '@Core/components/Buttons/Button';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import DropDown from '@Core/components/Inputs/Select/Contents/DropDown';

export default {
    name: 'MenuButton',
    components: {
        Button,
        ListElementDescription,
        ListElementTitle,
        DropDown,
        List: () => import('@Core/components/List/List'),
        ListElement: () => import('@Core/components/List/ListElement'),
        IconArrowDropDown: () => import('@Core/components/Icons/Arrows/IconArrowDropDown'),
        FadeTransition: () => import('@Core/components/Transitions/FadeTransition'),
    },
    inheritAttrs: false,
    props: {
        options: {
            type: Array,
            default: () => [],
        },
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
        dropDownOffset() {
            const {
                x, y, width, height,
            } = this.$refs.activator.$el.getBoundingClientRect();

            return {
                x, y, width, height,
            };
        },
        iconFillColor() {
            if (this.$attrs.theme === THEMES.SECONDARY) {
                if (this.$attrs.disabled) {
                    return GREY_DARK;
                }
                if (this.isHovered || this.isFocused) {
                    return GREEN;
                }
                return GRAPHITE;
            }

            return WHITE;
        },
        menuButtonClasses() {
            return {
                'button--menu-title': Boolean(this.$attrs.title),
            };
        },
        iconArrowState() {
            return this.isFocused ? ARROW.UP : ARROW.DOWN;
        },
    },
    watch: {
        isFocused() {
            if (!this.isFocused) {
                window.removeEventListener('click', this.onClickOutside);
            } else {
                window.addEventListener('click', this.onClickOutside);
            }
            this.$emit('focus', this.isFocused);
        },
    },
    destroyed() {
        window.removeEventListener('click', this.onClickOutside);
    },
    methods: {
        onMouseEnter() {
            this.isHovered = true;
        },
        onMouseLeave() {
            this.isHovered = false;
        },
        onClick() {
            this.isFocused = !this.isFocused;
        },
        onClickOutside(event) {
            const {
                top, left, width, height,
            } = this.$el.getBoundingClientRect();
            const { pageX, pageY } = event;

            if (!(pageX > left
                && pageX < left + width
                && pageY > top
                && pageY < top + height)) {
                this.isFocused = false;
            }
        },
        onSelectedValue(index) {
            this.$emit('input', this.options[index]);
        },
    },
};
</script>
<style lang="scss" scoped>
    .button {
        $button: &;

        &:not(&--menu-title) {
            width: 24px;
            height: 24px;
            padding: 0;
        }
    }
</style>
