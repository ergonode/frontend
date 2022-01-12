/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <div
            class="action-base-button__activator"
            ref="activator"
            @mousedown="onMouseDown"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave">
            <slot name="button" />
        </div>
        <Dropdown
            v-if="isReadyToRender"
            :parent-reference="$refs.activator"
            :fixed="fixedContent"
            :visible="isFocused"
            @click-outside="onMouseDownOutside">
            <List>
                <ListElement
                    v-for="(option, index) in options"
                    :key="index"
                    :size="smallSize"
                    :disabled="option.disabled"
                    @mousedown.native.prevent="event => onSelectedValue(event, index)">
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
        </Dropdown>
    </div>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    isObject,
} from '@Core/models/objectWrapper';

export default {
    name: 'ActionBaseButton',
    props: {
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
        /**
         * Determinate if the component is disabled
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
            isReadyToRender: false,
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
            if (!this.isReadyToRender) {
                this.isReadyToRender = true;
            }

            this.$emit('focus', this.isFocused);
        },
    },
    methods: {
        onMouseEnter() {
            this.isHovered = true;
            this.$emit('hover', true);
        },
        onMouseLeave() {
            this.isHovered = false;
            this.$emit('hover', false);
        },
        onMouseDown(event) {
            if (this.disabled) {
                return;
            }

            event.preventDefault();

            this.isFocused = !this.isFocused;
        },
        onMouseDownOutside({
            event,
            isClickedOutside,
        }) {
            const isClickedInsideActivator = this.$refs.activator.contains(event.target);

            if (isClickedInsideActivator) {
                return;
            }

            if (isClickedOutside || (this.dismissible && !isClickedOutside)) {
                this.isFocused = false;
            }
        },
        onSelectedValue(event, index) {
            if (!this.options[index].disabled) {
                this.$emit('input', this.options[index]);
            } else {
                event.stopPropagation();
            }
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
        }

        &__activator {
            position: relative;
        }
    }
</style>
