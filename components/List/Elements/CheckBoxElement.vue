/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListElement @click.native="localValue = !selectedValue">
        <ListElementAction>
            <CheckBox
                v-model="localValue" />
        </ListElementAction>
        <slot name="checkboxDescription">
            <ListElementDescription
                :subtitle="description"
                subtitle-typo="typo-label"
                :subtitle-color="color" />
        </slot>
    </ListElement>
</template>

<script>
import ListElement from '~/components/List/ListElement';
import ListElementDescription from '~/components/List/ListElementDescription';
import ListElementAction from '~/components/List/ListElementAction';
import CheckBox from '~/components/Inputs/CheckBox';

export default {
    name: 'CheckBoxElement',
    components: {
        ListElement,
        ListElementDescription,
        ListElementAction,
        CheckBox,
    },
    props: {
        description: {
            type: [Object, String, Number],
            required: false,
            default: '',
        },
        selectedValue: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        color() {
            return this.selectedValue
                ? 'txt--dark-graphite'
                : 'txt--graphite';
        },
        localValue: {
            get() {
                return this.selectedValue;
            },
            set(value) {
                this.$emit('value', { value, option: this.description });
            },
        },
    },
};
</script>
