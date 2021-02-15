/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalOverlay>
        <div class="update-products-modal">
            <ModalHeader
                :title="title"
                @close="onClose" />
            <div class="update-products-modal__body">
                <div class="update-products-modal__sidebar" />
                <div class="update-products-modal__form">
                    <DraggableForm
                        :title="'Edited attributes'"
                        :items="formItems">
                        <template #item="{ item }">
                            <Component
                                :is="item.component"
                                v-bind="item.props" />
                        </template>
                    </DraggableForm>
                </div>
            </div>
        </div>
    </ModalOverlay>
</template>

<script>
import {
    getUUID,
} from '@Core/models/stringWrapper';
import DraggableForm from '@UI/components/DraggableForm/DraggableForm';
import ModalHeader from '@UI/components/Modal/ModalHeader';
import ModalOverlay from '@UI/components/Modal/ModalOverlay';
import TextField from '@UI/components/TextField/TextField';

export default {
    name: 'UpdateProductsModal',
    components: {
        ModalOverlay,
        ModalHeader,
        DraggableForm,
    },
    props: {
        ids: {
            type: Array,
            default: () => [],
        },
        excludedIds: {
            type: Array,
            default: () => [],
        },
        selectedProductsCount: {
            type: Number,
            default: 0,
        },
        onApply: {
            type: Function,
            default: () => {},
        },
    },
    computed: {
        title() {
            return this.$t('@Products.batchAction.components.UpdateProductsModal.title', {
                info: this.selectedProductsCount,
            });
        },
        formItems() {
            return [
                {
                    id: getUUID(),
                    component: TextField,
                    label: 'First',
                    props: {
                        label: 'First',
                        placeholder: 'Am I first?',
                    },
                },
                {
                    id: getUUID(),
                    component: TextField,
                    label: 'Second',
                    props: {
                        label: 'Second',
                        placeholder: 'Am I second?',
                    },
                },
                {
                    id: getUUID(),
                    component: TextField,
                    label: 'Third',
                    props: {
                        label: 'Third',
                        placeholder: 'Am I third?',
                    },
                },
            ];
        },
    },
    methods: {
        onClose() {
            this.$emit('close');
        },
    },
};
</script>

<style lang="scss" scoped>
    .update-products-modal {
        display: flex;
        flex-direction: column;
        width: 1080px;
        height: 80%;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_6_DP;

        &__body {
            display: flex;
            height: 100%;
        }

        &__sidebar {
            width: 328px;
            height: 100%;
            background-color: #006600;
        }

        &__form {
            display: flex;
            flex: 1;
            justify-content: center;
            height: 100%;
            padding: 48px;
            box-sizing: border-box;
        }
    }
</style>
