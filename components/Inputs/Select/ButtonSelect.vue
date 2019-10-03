/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="btn"
        @click="onClick">
        <Component
            :is="buttonIconComponent"
            :fill-color="buttonIconFillColor" />
        <Transition
            v-if="isFocused"
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
    </div>
</template>

<script>

export default {
    name: 'ButtonSelect',
    components: {
        List: () => import('~/components/List/List'),
        ListElement: () => import('~/components/List/ListElement'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
        ListElementTitle: () => import('~/components/List/ListElementTitle'),
    },
    props: {
        iconPath: {
            type: String,
            required: true,
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
        buttonIconComponent() {
            return () => import(`~/components/Icon/${this.iconPath}`);
        },
        buttonIconFillColor() {
            return this.isFocused
                ? '#00bc87'
                : '#5c5f65';
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
            const { clientX, clientY } = event;

            if (!(clientX > left
                && clientX < left + width
                && clientY > top
                && clientY < top + height)) {
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
    .btn {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        cursor: pointer;
        outline: none;

        &__select-content {
            position: fixed;
            z-index: 999;
            display: flex;
            flex-direction: column;
            background-color: $white;
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);
            max-height: 200px;
            min-width: 130px;
        }
    }
</style>
