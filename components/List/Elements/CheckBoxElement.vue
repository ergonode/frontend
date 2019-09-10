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
export default {
    name: 'CheckBoxElement',
    components: {
        ListElement: () => import('~/components/List/ListElement'),
        ListElementDescription: () => import('~/components/List/ListElementDescription'),
        ListElementAction: () => import('~/components/List/ListElementAction'),
        CheckBox: () => import('~/components/Inputs/CheckBox'),
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
