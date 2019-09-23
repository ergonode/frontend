/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListElement
        :small="small"
        @click.native="onClick">
        <ListElementAction>
            <CheckBox
                :value="selectedValue"
                @input="onClick" />
        </ListElementAction>
        <slot name="description">
            <ListElementDescription>
                <ListElementTitle
                    :title="description"
                    :color="color" />
            </ListElementDescription>
        </slot>
    </ListElement>
</template>

<script>
import ListElement from '~/components/List/ListElement';
import ListElementDescription from '~/components/List/ListElementDescription';
import ListElementTitle from '~/components/List/ListElementTitle';
import ListElementAction from '~/components/List/ListElementAction';
import CheckBox from '~/components/Inputs/CheckBox';

export default {
    name: 'CheckBoxElement',
    components: {
        ListElement,
        ListElementDescription,
        ListElementTitle,
        ListElementAction,
        CheckBox,
    },
    props: {
        description: {
            type: [String, Number],
            default: '',
        },
        selectedValue: {
            type: Boolean,
            default: false,
        },
        small: {
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

<style lang="scss" scoped>
    .element-action {
        margin-right: 8px;
    }
</style>
