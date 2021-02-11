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
        <Dropdown
            v-if="isReadyToRender"
            :parent-reference="$refs.activator"
            :fixed="fixedContent"
            :visible="isFocused"
            @click-outside="onClickOutside">
            <List>
                <ListElement
                    v-for="(option, index) in options"
                    :key="index"
                    :size="smallSize"
                    :disabled="option.disabled"
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
import List from '@UI/components/List/List';
import ListElement from '@UI/components/List/ListElement';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import Dropdown from '@UI/components/Select/Dropdown/Dropdown';

export default {
    name: 'ActionBaseButton',
    components: {
        Dropdown,
        List,
        ListElement,
        ListElementDescription,
        ListElementTitle,
    },
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
            if (!this.options[index].disabled) {
                this.$emit('input', this.options[index]);
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
            pointer-events: none;
        }

        &__activator {
            position: relative;
        }
    }
</style>
