/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        :class="['btn', `btn--${theme}`,`btn--${size}`, {'btn--inactive': inactive}]"
        :disabled="disabled"
        :aria-label="title"
        @click="onClick">
        <div
            v-if="$scopedSlots.prepend || $slots.prepend"
            class="btn__prepend">
            <slot
                name="prepend"
                :icon-fill-color="iconFillColor" />
        </div>
        <span
            v-if="title"
            class="btn__title"
            v-text="title" />
        <div
            v-if="$scopedSlots.append || $slots.append"
            class="btn__append">
            <slot
                name="append"
                :icon-fill-color="iconFillColor"
                :icon-arrow-state="iconArrowState" />
        </div>
        <Transition
            v-if="isSelectButton"
            name="fade">
            <div
                class="btn__select-content"
                :style="contentPositionStyle">
                <List>
                    <ListElement
                        v-for="(option, index) in options"
                        :key="index"
                        @click.native="onSelectedValue(index)">
                        <ListElementDescription>
                            <ListElementTitle :title="option" />
                        </ListElementDescription>
                    </ListElement>
                </List>
            </div>
        </Transition>
    </button>
</template>
<script>
import { Themes, Sizes } from '~/model/buttons';
import { Arrow } from '~/model/icons/Arrow';
import {
    GRAPHITE, GREY_DARK, WHITE, GREEN,
} from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'NewButton',
    components: {
        List: () => import('~/components/List/List'),
        ListElement: () => import('~/components/List/ListElement'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
        ListElementTitle: () => import('~/components/List/ListElementTitle'),
    },
    props: {
        theme: {
            type: String,
            default: 'primary',
            validator: (value) => (value in Themes),
        },
        size: {
            type: String,
            default: 'regular',
            validator: (value) => (value in Sizes),
        },
        title: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        inactive: {
            type: Boolean,
            default: false,
        },
        options: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            isFocused: false,
            contentPositionStyle: null,
        };
    },
    computed: {
        isSelectButton() {
            return this.isFocused && this.options.length;
        },
        iconFillColor() {
            if (this.isSelectButton) return GREEN;
            if (this.theme === Themes.secondary) {
                if (this.disabled) {
                    return GREY_DARK;
                }
                return GRAPHITE;
            }

            return WHITE;
        },
        iconArrowState() {
            return this.isSelectButton ? Arrow.UP : Arrow.DOWN;
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
                width: `${width}px`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/new-button.scss";
</style>
