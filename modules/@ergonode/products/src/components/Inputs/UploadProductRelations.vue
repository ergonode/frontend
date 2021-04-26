/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputSolidStyle
        :size="smallSize"
        :height="height"
        :disabled="disabled">
        <template #activator>
            <InputController>
                <div class="upload-product-relations">
                    <template v-if="isValue">
                        <ProductCarousel
                            :value="value"
                            :current-index="currentIndex"
                            @current="onCurrentIndexChange" />
                        <div
                            v-if="!disabled"
                            class="upload-product-relations__settings">
                            <ActionFab
                                :size="smallSize"
                                :theme="secondaryTheme"
                                :options="settingsOptions"
                                @input="onSelectSetting">
                                <template #icon="{ color }">
                                    <IconDots :fill-color="color" />
                                </template>
                                <template #option="{ option }">
                                    <ListElementDescription>
                                        <ListElementTitle
                                            :size="smallSize"
                                            :title="option.text" />
                                    </ListElementDescription>
                                </template>
                            </ActionFab>
                        </div>
                    </template>
                    <Button
                        v-else-if="!disabled"
                        :title="title"
                        :size="smallSize"
                        :theme="secondaryTheme"
                        @click.native="onShowModal">
                        <template #prepend="{ color }">
                            <IconAdd :fill-color="color" />
                        </template>
                    </Button>
                </div>
                <InputLabel
                    v-if="label"
                    :style="{
                        top: '10px',
                        left: '12px',
                    }"
                    :required="required"
                    :floating="true"
                    :disabled="disabled"
                    :label="label" />
            </InputController>
        </template>
        <AddProductRelationsModalGrid
            v-if="isModalVisible"
            :value="value"
            :attribute-id="attributeId"
            :product-id="productId"
            @input="onValueChange"
            @close="onCloseModal" />
    </InputSolidStyle>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import Button from '@UI/components/Button/Button';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import InputController from '@UI/components/Input/InputController';
import InputLabel from '@UI/components/Input/InputLabel';
import InputSolidStyle from '@UI/components/Input/InputSolidStyle';

export default {
    name: 'UploadProductRelations',
    components: {
        InputController,
        InputSolidStyle,
        InputLabel,
        Button,
        IconAdd,
        IconDots: () => import('@UI/components/Icons/Others/IconDots'),
        ProductCarousel: () => import('@Products/components/ProductCarousel/ProductCarousel'),
        AddProductRelationsModalGrid: () => import('@Products/components/Modals/AddProductRelationsModalGrid'),
        ActionFab: () => import('@UI/components/ActionFab/ActionFab'),
        ListElementDescription: () => import('@UI/components/List/ListElementDescription'),
        ListElementTitle: () => import('@UI/components/List/ListElementTitle'),
    },
    props: {
        attributeId: {
            type: String,
            default: '',
        },
        productId: {
            type: String,
            default: '',
        },
        /**
         * The value of the component
         */
        value: {
            type: Array,
            default: () => [],
        },
        /**
         * Determines image objectFit property
         */
        objectFit: {
            type: String,
            default: 'none',
        },
        /**
         * The height of the component
         */
        height: {
            type: String,
            default: 'unset',
        },
        /**
         * The label is a text caption or description for the component
         */
        label: {
            type: String,
            default: '',
        },
        /**
         * Determines if the given field is required
         */
        required: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the given field is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isModalVisible: false,
            currentIndex: 0,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        regularSize() {
            return SIZE.REGULAR;
        },
        title() {
            return this.$t('@Products.product.components.UploadProductRelations.title');
        },
        settingsOptions() {
            return [
                {
                    text: this.$t('@Products.product.components.UploadProductRelations.addRelationOption'),
                    action: this.onShowModal,
                },
                {
                    text: this.$t('@Products.product.components.UploadProductRelations.removeRelationOption'),
                    action: this.onRemoveRelation,
                },
            ];
        },
        products() {
            return [];
        },
        isValue() {
            return this.value.length > 0;
        },
    },
    methods: {
        onValueChange(value) {
            this.$emit('input', value);
        },
        onCurrentIndexChange(index) {
            this.currentIndex = index;
        },
        onShowModal() {
            this.isModalVisible = true;
        },
        onRemoveRelation() {
            const value = this.value.filter(id => id !== this.value[this.currentIndex]);

            if (this.currentIndex > 0) {
                this.currentIndex -= 1;
            }

            this.$emit('input', value);
        },
        onCloseModal() {
            this.isModalVisible = false;
        },
        onSelectSetting(option) {
            option.action();
        },
    },
};
</script>

<style lang="scss" scoped>
    .upload-product-relations {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        &__settings {
            position: absolute;
            top: 12px;
            right: 12px;
            background-color: $WHITE;
            border-radius: 50%;
        }
    }

    .fixed-container {
        position: relative;
        flex: 1 1 auto;
        width: 100%;
        height: 0;
        overflow: hidden;
    }
</style>
