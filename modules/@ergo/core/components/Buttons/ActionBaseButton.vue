/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="action-button">
        <div
            class="action-button__activator"
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
                            :small="true"
                            @click.native.prevent="onSelectedValue(index)">
                            <slot
                                name="option"
                                :option="option">
                                <ListElementDescription v-if="isOptionsValid">
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
    </div>
</template>

<script>
import { isObject } from '@Core/models/objectWrapper';
import DropDown from '@Core/components/Inputs/Select/DropDown/DropDown';
import List from '@Core/components/List/List';
import ListElement from '@Core/components/List/ListElement';
import ListElementDescription from '@Core/components/List/ListElementDescription';
import ListElementTitle from '@Core/components/List/ListElementTitle';
import FadeTransition from '@Core/components/Transitions/FadeTransition';

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
                x, y, width, height: height + 1,
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
        onClickOutside({ isClickedOutside }) {
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
    .action-button {
        position: relative;
        display: flex;
        flex-direction: column;
        width: max-content;

        &__activator {
            position: relative;
        }
    }
</style>
