/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :class="menuButtonClasses"
        v-bind="$attrs"
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
            <div
                v-if="isFocused"
                class="button__select-content"
                :style="contentPositionStyle">
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
                                <ListElementTitle :title="option" />
                            </ListElementDescription>
                        </slot>
                    </ListElement>
                </List>
            </div>
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

export default {
    name: 'MenuButton',
    components: {
        Button,
        ListElementDescription,
        ListElementTitle,
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
    },
    data() {
        return {
            isFocused: false,
            isHovered: false,
            contentPositionStyle: null,
        };
    },
    computed: {
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
                this.contentPositionStyle = this.getContentPositionStyle();
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
        getContentPositionStyle() {
            const {
                top,
                left,
                width,
                height,
            } = this.$el.getBoundingClientRect();
            const { innerHeight, innerWidth } = window;
            const maxHeight = 200;
            const minWidth = 130;
            const leftPos = left + minWidth > innerWidth ? (left - minWidth + (width / 2)) : left;

            if (innerHeight - top < maxHeight) {
                const offsetBottom = innerHeight - top;

                return {
                    left: `${leftPos}px`,
                    bottom: `${offsetBottom + 1}px`,
                };
            }

            return {
                left: `${leftPos}px`,
                top: `${top + height + 2}px`,
            };
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

    .button__select-content {
        position: fixed;
        z-index: $Z_INDEX_DROP_DOWN;
        display: flex;
        flex-direction: column;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;
        max-height: 200px;
        min-width: 130px;
        max-width: 170px;
        text-transform: none;
    }
</style>
