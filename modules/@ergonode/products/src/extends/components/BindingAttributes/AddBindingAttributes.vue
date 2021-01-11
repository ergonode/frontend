/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        :class="classes"
        @click="onShowModal">
        <IconAdd />
        <span :class="titleClasses">Add attribute</span>
        <AddBindingAttributesModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @submitted="onAddedData" />
    </button>
</template>

<script>
import IconAdd from '@UI/components/Icons/Actions/IconAdd';

export default {
    name: 'AddBindingAttributes',
    components: {
        IconAdd,
        AddBindingAttributesModalForm: () => import('@Products/extends/components/Modals/AddBindingAttributesModalForm'),
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    computed: {
        classes() {
            return [
                'add-binding-attributes',
            ];
        },
        titleClasses() {
            return [
                'add-binding-attributes__title',
            ];
        },
    },
    methods: {
        onShowModal() {
            this.isModalVisible = true;
        },
        onCloseModal() {
            this.isModalVisible = false;
        },
        onAddedData() {
            this.onCloseModal();
            this.$emit('added');
        },
    },
};
</script>

<style lang="scss" scoped>
.add-binding-attributes {
    position: relative;
    display: flex;
    align-items: center;
    border: none;
    padding: 4px;
    background-color: $WHITE;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    cursor: pointer;
    outline: none;

    &__title {
        margin-left: 2px;
        color: $GRAPHITE_DARK;
        font: $FONT_MEDIUM_12_16;
    }
}
</style>
