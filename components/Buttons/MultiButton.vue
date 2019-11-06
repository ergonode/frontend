/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AppendIconButton
        :class="multiButtonClasses"
        :disabled="disabled"
        :title="title"
        :theme="theme"
        :size="size"
        :plain="plain"
        @click.native="onClick">
        <template #append="{ color }">
            <slot
                name="icon"
                :color="color">
                <IconArrowDropDown
                    :state="iconArrowState"
                    :fill-color="color" />
            </slot>
        </template>
        <Transition
            v-if="isSelectButton"
            name="fade">
            <div
                class="btn__select-content"
                :style="contentPositionStyle">
                <slot name="content">
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
                </slot>
            </div>
        </Transition>
    </AppendIconButton>
</template>
<script>
import { ARROW } from '~/defaults/icons';
import buttonPropsMixin from '~/mixins/buttons/buttonPropsMixin';

export default {
    name: 'MultiButton',
    mixins: [buttonPropsMixin],
    components: {
        AppendIconButton: () => import('~/components/Buttons/AppendIconButton'),
        List: () => import('~/components/List/List'),
        ListElement: () => import('~/components/List/ListElement'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
        ListElementTitle: () => import('~/components/List/ListElementTitle'),
        IconArrowDropDown: () => import('~/components/Icon/Arrows/IconArrowDropDown'),
    },
    props: {
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
        multiButtonClasses() {
            return !this.title ? 'btn--multi' : null;
        },
        isSelectButton() {
            return this.isFocused;
        },
        iconArrowState() {
            return this.isSelectButton ? ARROW.UP : ARROW.DOWN;
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

    .btn--multi {
        width: 24px;
        height: 24px;
        padding: 0;
    }

    .btn__select-content {
        position: fixed;
        z-index: 999;
        display: flex;
        flex-direction: column;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;
        max-height: 200px;
        min-width: 130px;
    }
</style>
