/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridPanelHeader>
        <BindingAttribute
            v-for="(attribute, index) in attributes"
            :key="attribute.id"
            :index="index"
            :disabled="disabled"
            :attribute="attribute"
            @remove="onRemoveBinding" />
        <AddBindingAttributes
            :disabled="disabled"
            @added="onAddedBinding" />
    </GridPanelHeader>
</template>

<script>
import AddBindingAttributes from '@Products/extends/components/BindingAttributes/AddBindingAttributes';
import BindingAttribute from '@Products/extends/components/BindingAttributes/BindingAttribute';

export default {
    name: 'BindingAttributes',
    components: {
        BindingAttribute,
        AddBindingAttributes,
    },
    props: {
        attributes: {
            type: Array,
            default: () => [],
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onAddedBinding() {
            this.$emit('added');
        },
        onRemoveBinding(index) {
            this.$emit('remove-binding', index);
        },
    },
};
</script>
