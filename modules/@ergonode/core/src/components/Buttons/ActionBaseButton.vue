/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <div
            class="action-base-button__activator"
            ref="activator"
            @click="onClick"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave">
            <slot name="button" />
        </div>
        <FadeTransition>
            <DropDown
                v-if="isFocused"
                :offset="getDropDownOffset()"
                :fixed="fixedContent"
                @clickOutside="onClickOutside">
                <template #body>
                    <List>
                        <ListElement
                            v-for="(option, index) in options"
                            :key="index"
                            :size="smallSize"
                            @click.native.prevent="onSelectedValue(index)">
                            <slot
                                name="option"
                                :option="option">
                                <ListElementDescription v-if="isOptionsValid">
                                    <ListElementTitle
                                        :title="option"
                                        :size="smallSize" />
                                </ListElementDescription>
                            </slot>
                        </ListElement>
                    </List>
                </template>
            </DropDown>
        </FadeTransition>
    </div>
</template>

<script>
import DropDown from '@Core/components/Inputs/Select/DropDown/DropDown';
import List from '@Core/components/List/List';
import ListElement from '@Core/components/List/ListElement';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import FadeTransition from '@Core/components/Transitions/FadeTransition';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    isObject,
} from '@Core/models/objectWrapper';

export default {
    name: 'ActionButton',
    components: {
        DropDown,
        List,
        ListElement,
        ListElementDescription,
        ListElementTitle,
        FadeTransition,
    },
    props: {
        /**
         * The options of the dropdown
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
        /**
         * The disabled flag
         */
        disabled: {
            type: Boolean,
            default: true,
        },
        /**
         * The dismissible flag is telling if we can toggle between active an inactive state
         */
        dismissible: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isFocused: false,
            isHovered: false,
        };
    },
    computed: {
        classes() {
            return [
                'action-base-button',
                {
                    'action-base-button--disabled': this.disabled,
                },
            ];
        },
        smallSize() {
            return SIZE.SMALL;
        },
        isOptionsValid() {
            return this.options.length && !isObject(this.options[0]);
        },
    },
    watch: {
        isFocused() {
            this.$emit('focus', this.isFocused);
        },
    },
    methods: {
        getDropDownOffset() {
            const {
                x, y, width, height,
            } = this.$refs.activator.getBoundingClientRect();

            return {
                x,
                y,
                width,
                height: height + 1,
            };
        },
        onMouseEnter() {
            this.isHovered = true;
            this.$emit('hover', true);
        },
        onMouseLeave() {
            this.isHovered = false;
            this.$emit('hover', false);
        },
        onClick() {
            this.isFocused = !this.isFocused;
        },
        onClickOutside({
            isClickedOutside,
        }) {
            if (isClickedOutside || (this.dismissible && !isClickedOutside)) {
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
    .action-base-button {
        position: relative;
        display: flex;
        flex-direction: column;
        width: max-content;

        &--disabled {
            cursor: not-allowed;
            pointer-events: none;
        }

        &__activator {
            position: relative;
        }
    }
</style>
