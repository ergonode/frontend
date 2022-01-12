/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListElement
        :size="size"
        :disabled="value.disabled"
        :selected="selected && !multiselect"
        @click.native.prevent="onSelectValue">
        <slot
            name="option"
            :is-selected="selected">
            <template>
                <ListElementAction
                    v-if="multiselect"
                    :size="size">
                    <CheckBox
                        :value="selected"
                        :disabled="value.disabled" />
                </ListElementAction>
                <ListElementDescription>
                    <ListElementTitle
                        :hint="value.hint"
                        :size="size"
                        :title="presentingValue" />
                </ListElementDescription>
            </template>
        </slot>
    </ListElement>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'SelectListElement',
    props: {
        /**
         * Index of given component at the loop
         */
        index: {
            type: Number,
            required: true,
        },
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.REGULAR,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
        /**
         * The value of the dropdown list option
         */
        value: {
            type: [
                String,
                Number,
                Object,
            ],
            default: '',
        },
        /**
         * Determines if component is selected
         */
        selected: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the component is multiple choice
         */
        multiselect: {
            type: Boolean,
            default: false,
        },
        /**
         * The key of the option
         */
        optionKey: {
            type: String,
            default: '',
        },
        /**
         * The key of the value
         */
        optionValue: {
            type: String,
            default: '',
        },
    },
    computed: {
        presentingValue() {
            if (this.value[this.optionValue]) {
                return this.value[this.optionValue];
            }

            if (this.value[this.optionKey]) {
                return `#${this.value[this.optionKey]}`;
            }

            return this.value;
        },
    },
    methods: {
        onSelectValue(event) {
            if (!this.value.disabled) {
                this.$emit('input', this.index);
            } else {
                event.stopPropagation();
            }
        },
    },
};
</script>
