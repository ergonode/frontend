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
                <InputImageController>
                    <template v-if="isValue">
                        <ProductCarousel
                            :value="value"
                            :current-index="currentIndex"
                            @current="onCurrentIndexChange" />
                        <ActionFab
                            v-if="!disabled"
                            :floating="{
                                top: '4px',
                                right: '4px',
                                backgroundColor: whiteColor,
                                borderRadius: '50%',
                            }"
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
                </InputImageController>
                <InputLabel
                    v-if="label"
                    :required="required"
                    :floating="true"
                    :disabled="disabled"
                    :label="label" />
            </InputController>
        </template>
        <AddProductRelationsModalGrid
            v-if="isModalVisible"
            :value="value"
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
import confirmLeaveModalMixin from '@Core/mixins/feedback/confirmLeaveModalMixin';
import {
    ROUTE_NAME,
} from '@Products/config/routes';
import {
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';

export default {
    name: 'UploadProductRelations',
    components: {
        ProductCarousel: () => import('@Products/components/ProductCarousel/ProductCarousel'),
        AddProductRelationsModalGrid: () => import('@Products/components/Modals/AddProductRelationsModalGrid'),
    },
    mixins: [
        confirmLeaveModalMixin,
    ],
    props: {
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
        whiteColor() {
            return WHITE;
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
                {
                    text: this.$t('@Products.product.components.UploadProductRelations.removeAllRelationsOption'),
                    action: this.onRemoveAllRelations,
                },
                {
                    text: this.$t('@Products.product.components.UploadProductRelations.navigateToRelationOption'),
                    action: this.onNavigateToRelation,
                },
            ];
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
        onRemoveAllRelations() {
            this.currentIndex = 0;

            this.$emit('input', []);
        },
        onRemoveRelation() {
            const value = this.value.filter(id => id !== this.value[this.currentIndex]);

            if (this.currentIndex > 0) {
                this.currentIndex -= 1;
            }

            this.$emit('input', value);
        },
        onNavigateToRelation() {
            const callback = () => {
                this.$router.push({
                    name: ROUTE_NAME.PRODUCT_EDIT_GENERAL,
                    params: {
                        id: this.value[this.currentIndex],
                    },
                });
            };

            this.confirmModal({
                confirmCallback: callback,
                proceedCallback: callback,
            });
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
