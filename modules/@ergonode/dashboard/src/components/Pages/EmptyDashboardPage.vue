/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="empty-dashboard-page">
        <VerticalFixedScroll>
            <div class="vertical-container">
                <div class="horizontal-container">
                    <div class="dashboard-stats">
                        <DoughnutProductsChart
                            v-if="isAllowedToReadProduct"
                            class="dashboard-stats__product-count-chart"
                            :datasets="datasets"
                        />
                    </div>
                    <div class="dashboard-header">
                        <div class="dashboard-header__description">
                            <h1
                                class="dashboard-header__title"
                                v-text="title" />
                            <h2
                                class="dashboard-header__subtitle"
                                v-text="subtitle" />
                        </div>
                    </div>
                </div>
                <CreateProductStepList>
                    <CreateProductStepListElement
                        :title="firstStep.title"
                        :subtitle="firstStep.subtitle"
                        :description="firstStep.description">
                        <template #action>
                            <Button
                                title="NEW ATTRIBUTE"
                                :size="smallSize"
                                :disabled="!isAllowedToCreateAttribute"
                                @click.native="onShowNewAttributeModal">
                                <template #prepend="{ color }">
                                    <IconAdd :fill-color="color" />
                                </template>
                            </Button>
                        </template>
                    </CreateProductStepListElement>
                    <CreateProductStepListElement
                        :title="secondStep.title"
                        :subtitle="secondStep.subtitle"
                        :description="secondStep.description">
                        <template #action>
                            <Button
                                title="NEW TEMPLATE"
                                :size="smallSize"
                                :disabled="!isAllowedToCreateTemplate"
                                @click.native="onShowNewTemplateModal">
                                <template #prepend="{ color }">
                                    <IconAdd :fill-color="color" />
                                </template>
                            </Button>
                        </template>
                    </CreateProductStepListElement>
                    <CreateProductStepListElement
                        :title="thirdStep.title"
                        :subtitle="thirdStep.subtitle"
                        :description="thirdStep.description">
                        <template #action>
                            <Button
                                title="NEW PRODUCT"
                                :size="smallSize"
                                :disabled="!isAllowedToCreateProduct"
                                @click.native="onShowNewProductModal">
                                <template #prepend="{ color }">
                                    <IconAdd :fill-color="color" />
                                </template>
                            </Button>
                        </template>
                    </CreateProductStepListElement>
                </CreateProductStepList>
            </div>
        </VerticalFixedScroll>
        <CreateAttributeModalForm
            v-if="isCreateAttributeVisible"
            @close="onCloseAttributeModal" />
        <CreateProductTemplateModalForm
            v-if="isCreateProductTemplateVisible"
            @close="onCloseProductTemplateModal" />
        <CreateProductModalForm
            v-if="isCreateProductVisible"
            @close="onCloseProductModal"
            @created="onCreatedProduct" />
    </div>
</template>

<script>
import ATTRIBUTE_PRIVILEGES from '@Attributes/config/privileges';
import {
    SIZE,
} from '@Core/defaults/theme';
import CreateProductStepList from '@Dashboard/components/CreateProductStepList/CreateProductStepList';
import CreateProductStepListElement from '@Dashboard/components/CreateProductStepList/Element/CreateProductStepListElement';
import DoughnutProductsChart from '@Products/components/Chart/DoughnutProductsChart';
import PRODUCT_PRIVILEGES from '@Products/config/privileges';
import TEMPLATE_PRIVILEGES from '@Templates/config/privileges';
import {
    GREY,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Button from '@UI/components/Button/Button';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import VerticalFixedScroll from '@UI/components/Layout/Scroll/VerticalFixedScroll';

export default {
    name: 'EmptyDashboardPage',
    components: {
        CreateProductStepList,
        CreateProductStepListElement,
        Button,
        IconAdd,
        VerticalFixedScroll,
        DoughnutProductsChart,
        CreateAttributeModalForm: () => import('@Attributes/components/Modals/CreateAttributeModalForm'),
        CreateProductModalForm: () => import('@Products/components/Modals/CreateProductModalForm'),
        CreateProductTemplateModalForm: () => import('@Templates/components/Modals/CreateProductTemplateModalForm'),
    },
    data() {
        return {
            isCreateAttributeVisible: false,
            isCreateProductVisible: false,
            isCreateProductTemplateVisible: false,
        };
    },
    computed: {
        datasets() {
            return [
                {
                    data: [
                        100,
                    ],
                    backgroundColor: [
                        GREY,
                    ],
                    borderWidth: 0,
                },
            ];
        },
        isAllowedToCreateAttribute() {
            return this.$hasAccess([
                ATTRIBUTE_PRIVILEGES.ATTRIBUTE.create,
            ]);
        },
        isAllowedToCreateProduct() {
            return this.$hasAccess([
                PRODUCT_PRIVILEGES.PRODUCT.create,
            ]);
        },
        isAllowedToReadProduct() {
            return this.$hasAccess([
                PRODUCT_PRIVILEGES.PRODUCT.read,
            ]);
        },
        isAllowedToCreateTemplate() {
            return this.$hasAccess([
                TEMPLATE_PRIVILEGES.TEMPLATE_DESIGNER.create,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        title() {
            return 'Create your products in 3 simple steps';
        },
        subtitle() {
            return 'Prepare your products’ experience in Ergonode! First start with the attributes, then configure the product template, and finally start to enrich your product data!';
        },
        firstStep() {
            return {
                title: '1.',
                subtitle: 'Start with attributes',
                description: 'Attributes are the smallest elements that describe your product. For example, it could be a color, description, photo or dimensions.',
            };
        },
        secondStep() {
            return {
                title: '2.',
                subtitle: 'Configure product template',
                description: 'Product template is a set of attributes, whose position and size can be freely configured, thanks to that it can reflect your products look.',
            };
        },
        thirdStep() {
            return {
                title: '3.',
                subtitle: 'Create your products',
                description: 'Here you can start to enrich your products with data, descriptions, photos and start preparing translations for other languages.',
            };
        },
    },
    methods: {
        onShowNewAttributeModal() {
            this.isCreateAttributeVisible = true;
        },
        onShowNewTemplateModal() {
            this.isCreateProductTemplateVisible = true;
        },
        onShowNewProductModal() {
            this.isCreateProductVisible = true;
        },
        onCloseAttributeModal() {
            this.isCreateAttributeVisible = false;
        },
        onCloseProductTemplateModal() {
            this.isCreateProductTemplateVisible = false;
        },
        onCloseProductModal() {
            this.isCreateProductVisible = false;
        },
        onCreatedProduct() {
            this.$emit('product-created');
        },
    },
};
</script>

<style lang="scss" scoped>
    .empty-dashboard-page {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .vertical-container {
        display: grid;
        padding: 40px;
    }

    .horizontal-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .dashboard-header {
        width: 440px;
        margin-bottom: 40px;

        &__title {
            color: $WHITE;
            font: $FONT_SEMI_BOLD_40_48;
        }

        &__subtitle {
            margin-top: 24px;
            color: $GREY;
            font: $FONT_MEDIUM_16_24;
        }
    }

    .dashboard-stats {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 358px;
        height: 358px;
        margin: 40px 170px 40px 0;
        background:
            url("~@Dashboard/assets/images/dashboard_man.svg")
            no-repeat
            right
            bottom;
        background-size: contain;

        &__product-count-chart {
            width: 174px;
            height: 174px;
            margin-right: -130px;
        }
    }
</style>
