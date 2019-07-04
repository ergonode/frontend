/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="btn"
        @click="onClick">
        <Icon
            :icon="icon"
            size="medium" />
        <Transition
            v-if="isFocused"
            name="fade">
            <div
                class="btn__select-content"
                :style="selectContentPosition">
                <slot name="content">
                    <List>
                        <ListElement
                            v-for="(option, index) in options"
                            :key="index"
                            regular
                            @click.native="onSelectedValue(index)">
                            <ListElementDescription
                                :subtitle="option"
                                subtitle-color="txt--graphite" />
                        </ListElement>
                    </List>
                </slot>
            </div>
        </Transition>
    </div>
</template>

<script>
import Icon from '~/components/Icon/Icon';

export default {
    name: 'ButtonSelect',
    components: {
        Icon,
        List: () => import('~/components/List/List'),
        ListElement: () => import('~/components/List/ListElement'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
    },
    props: {
        icon: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            isFocused: false,
        };
    },
    computed: {
        selectContentPosition() {
            const { $el } = this;
            const boundingRect = $el.getBoundingClientRect();
            const {
                top,
                left,
                width,
                height,
            } = boundingRect;
            const { innerHeight } = window;
            const maxHeight = 200;

            if (innerHeight - top < maxHeight) {
                const offsetBottom = innerHeight - top;

                return {
                    left: `${left}px`,
                    bottom: `${offsetBottom + 1}px`,
                };
            }

            return {
                left: `${left}px`,
                top: `${top + height + 2}px`,
                width: `${width}px`,
            };
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
