/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListElement
        :size="size"
        :disabled="value.disabled"
        :selected="selected"
        @click.native.prevent="onSelectValue">
        <slot
            name="option"
            :is-selected="selected">
            <template v-if="isOptionValid">
                <ListElementAction
                    v-if="multiselect"
                    :size="size">
                    <CheckBox :value="selected" />
                </ListElementAction>
                <ListElementDescription>
                    <ListElementTitle
                        :size="size"
                        :title="value" />
                </ListElementDescription>
            </template>
        </slot>
    </ListElement>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    isObject,
} from '@Core/models/objectWrapper';
import CheckBox from '@UI/components/CheckBox/CheckBox';
import ListElement from '@UI/components/List/ListElement';
import ListElementAction from '@UI/components/List/ListElementAction';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';

export default {
    name: 'SelectListElement',
    components: {
        ListElement,
        ListElementAction,
        ListElementDescription,
        ListElementTitle,
        CheckBox,
    },
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
    },
    computed: {
        isOptionValid() {
            return !isObject(this.value);
        },
    },
    methods: {
        onSelectValue() {
            this.$emit('input', this.index);
        },
    },
};
</script>
