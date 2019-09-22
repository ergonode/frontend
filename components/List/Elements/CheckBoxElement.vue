/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListElement @click.native="onClick">
        <ListElementAction>
            <CheckBox
                v-model="selectedValue" />
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
            default: '',
        },
        selectedValue: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        color() {
            return this.selectedValue
                ? 'txt--dark-graphite'
                : 'txt--graphite';
        },
    },
    methods: {
        onClick() {
            this.$emit('value', { value: !this.selectedValue, option: this.description });
        },
    },
};
</script>
