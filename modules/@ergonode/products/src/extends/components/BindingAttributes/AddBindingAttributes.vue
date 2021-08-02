/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <button
        :class="classes"
        type="button"
        :aria-label="$t('@Products.productExtend.components.AddBindingAttributes.title')"
        @click="onShowModal">
        <IconAdd />
        <span
            :class="titleClasses"
            v-text="title" />
        <AddBindingAttributesModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @added="onAddedData" />
    </button>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';

export default {
    name: 'AddBindingAttributes',
    components: {
        AddBindingAttributesModalForm: () => import('@Products/extends/components/Modals/AddBindingAttributesModalForm'),
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
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
        title() {
            return this.$t('@Products.productExtend.components.AddBindingAttributes.title');
        },
    },
    methods: {
        onShowModal() {
            if (this.disabled) {
                this.$addAlert({
                    type: ALERT_TYPE.INFO,
                    message: this.$t('@Products.productExtend.components.AddBindingAttributes.infoAlert'),
                });

                return;
            }

            this.isModalVisible = true;
        },
        onCloseModal() {
            this.isModalVisible = false;
        },
        onAddedData() {
            this.$emit('added');
            this.onCloseModal();
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
