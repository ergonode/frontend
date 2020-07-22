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
                            :style="{ height: '174px', width: '174px' }"
                            title="0"
                            subtitle="Products total" />
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
                <ProgressList>
                    <ProgressListElement
                        :title="firstStep.title"
                        :subtitle="firstStep.subtitle"
                        :description="firstStep.description">
                        <template #action>
                            <Button
                                title="NEW ATTRIBUTE"
                                :size="smallSize"
                                :disabled="!$hasAccess(['ATTRIBUTE_CREATE'])"
                                @click.native="onShowNewAttributeModal">
                                <template #prepend="{ color }">
                                    <IconAdd :fill-color="color" />
                                </template>
                            </Button>
                        </template>
                    </ProgressListElement>
                    <ProgressListElement
                        :title="secondStep.title"
                        :subtitle="secondStep.subtitle"
                        :description="secondStep.description">
                        <template #action>
                            <Button
                                title="NEW TEMPLATE"
                                :size="smallSize"
                                :disabled="!$hasAccess(['TEMPLATE_DESIGNER_CREATE'])"
                                @click.native="onShowNewTemplateModal">
                                <template #prepend="{ color }">
                                    <IconAdd :fill-color="color" />
                                </template>
                            </Button>
                        </template>
                    </ProgressListElement>
                    <ProgressListElement
                        :title="thirdStep.title"
                        :subtitle="thirdStep.subtitle"
                        :description="thirdStep.description">
                        <template #action>
                            <Button
                                title="NEW PRODUCT"
                                :size="smallSize"
                                :disabled="!$hasAccess(['PRODUCT_CREATE'])"
                                @click.native="onShowNewProductModal">
                                <template #prepend="{ color }">
                                    <IconAdd :fill-color="color" />
                                </template>
                            </Button>
                        </template>
                    </ProgressListElement>
                </ProgressList>
            </div>
        </VerticalFixedScroll>
        <CreateAttributeModalForm
            v-if="isCreateAttributeVisible"
            @close="onCloseAttributeModal"
            @create="onCreatedAttribute" />
        <CreateProductTemplateModalForm
            v-if="isCreateProductTemplateVisible"
            @close="onCloseProductTemplateModal"
            @create="onCreatedProductTemplate" />
        <CreateProductModalForm
            v-if="isCreateProductVisible"
            @close="onCloseProductModal"
            @create="onCreatedProduct" />
    </div>
</template>

<script>
import Button from '@Core/components/Buttons/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import VerticalFixedScroll from '@Core/components/Layout/Scroll/VerticalFixedScroll';
import {
    SIZE,
} from '@Core/defaults/theme';
import ProgressListElement from '@Dashboard/components/ProgressList/Element/ProgressListElement';
import ProgressList from '@Dashboard/components/ProgressList/ProgressList';
import DoughnutProductsChart from '@Products/components/Chart/DoughnutProductsChart';

export default {
    name: 'EmptyDashboardPage',
    components: {
        ProgressList,
        ProgressListElement,
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
        onCreatedAttribute() {
            // TODO:
        },
        onCreatedProductTemplate() {
            // TODO:
        },
        onCreatedProduct() {
            // TODO:
        },
    },
};
</script>

<style lang="scss" scoped>
    .empty-dashboard-page {
        display: flex;
        flex-direction: column;
        background-color: $GRAPHITE_COAL;
        height: 100%;
        box-sizing: border-box;
    }

    .vertical-container {
        display: grid;
        padding: 40px;
    }

    .horizontal-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
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
        align-items: center;
        width: 450px;
        height: 300px;
        margin: 40px 120px 40px 0;
        background: url("~@Core/assets/images/login/login_password_recovery_face.png") no-repeat right bottom;
        background-size: contain;

        &__image {
            height: 280px;
        }
    }
</style>
