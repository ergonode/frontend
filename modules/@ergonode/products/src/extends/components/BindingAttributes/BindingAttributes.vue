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
        <AddBindingAttributes @click.native="onShowModal" />
        <AddBindingAttributesModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </GridPanelHeader>
</template>

<script>
import GridPanelHeader from '@Core/components/Grid/Header/GridPanelHeader';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import AddBindingAttributes from '@Products/extends/components/BindingAttributes/AddBindingAttributes';
import BindingAttribute from '@Products/extends/components/BindingAttributes/BindingAttribute';

export default {
    name: 'BindingAttributes',
    components: {
        GridPanelHeader,
        BindingAttribute,
        AddBindingAttributes,
        AddBindingAttributesModalForm: () => import('@Products/extends/components/Modals/AddBindingAttributesModalForm'),
    },
    props: {
        attributes: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            isModalVisible: false,
            fetchGridData: false,
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onShowModal() {
            this.isModalVisible = true;
        },
        onCloseModal() {
            this.isModalVisible = false;
        },
        onCreatedData() {
            this.onCloseModal();

            this.$emit('added');
        },
        onRemoveBinding(index) {
            this.$emit('removeBinding', index);
        },
    },
};
</script>
