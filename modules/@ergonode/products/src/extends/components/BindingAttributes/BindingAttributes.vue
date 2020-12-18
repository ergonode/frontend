/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridPanelHeader>
        <BindingAttribute
            v-for="(attribute, index) in attributes"
            :index="index"
            :attribute="attribute"
            :key="attribute.id"
            @remove="onRemoveBinding" />
        <AddBindingAttributes @added="onAddedBinding" />
    </GridPanelHeader>
</template>

<script>
import AddBindingAttributes from '@Products/extends/components/BindingAttributes/AddBindingAttributes';
import BindingAttribute from '@Products/extends/components/BindingAttributes/BindingAttribute';
import GridPanelHeader from '@UI/components/Grid/Header/GridPanelHeader';

export default {
    name: 'BindingAttributes',
    components: {
        GridPanelHeader,
        BindingAttribute,
        AddBindingAttributes,
    },
    props: {
        attributes: {
            type: Array,
            default: () => [],
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
