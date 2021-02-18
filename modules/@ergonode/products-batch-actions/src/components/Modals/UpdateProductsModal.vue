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
                <VerticalTabBar :items="verticalTabs" />
                <div class="update-products-modal__form-section">
                    <VerticalFixedScroll>
                        <div class="update-products-modal__form">
                            <DraggableForm
                                :title="$t('@ProductsBatchActions.productBatchAction.components.UpdateProductsModal.draggableFormTitle')"
                                :width="424"
                                :items="formItems"
                                @add-item="onAddItem"
                                @remove-item="onRemoveItem">
                                <template #item="{ item }">
                                    <Component
                                        :is="item.component"
                                        v-bind="item.props" />
                                </template>
                            </DraggableForm>
                        </div>
                    </VerticalFixedScroll>
                </div>
            </div>
        </div>
    </ModalOverlay>
</template>

<script>
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import AttributesSideBar
    from '@ProductsBatchActions/extends/attribute/components/SideBars/AttributesSideBar';
import DraggableForm from '@UI/components/DraggableForm/DraggableForm';
import VerticalFixedScroll from '@UI/components/Layout/Scroll/VerticalFixedScroll';
import ModalHeader from '@UI/components/Modal/ModalHeader';
import ModalOverlay from '@UI/components/Modal/ModalOverlay';
import VerticalTabBar from '@UI/components/TabBar/VerticalTabBar';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'UpdateProductsModal',
    components: {
        VerticalFixedScroll,
        AttributesSideBar,
        ModalOverlay,
        ModalHeader,
        DraggableForm,
        VerticalTabBar,
    },
    mixins: [
        modalFeedbackMixin,
    ],
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
    data() {
        return {
            formItems: [],
        };
    },
    computed: {
        title() {
            return this.$t('@ProductsBatchActions.productBatchAction.components.UpdateProductsModal.title', {
                info: this.selectedProductsCount,
            });
        },
        verticalTabs() {
            return [
                {
                    title: this.$t('@ProductsBatchActions.attribute._.title'),
                    component: () => import('@ProductsBatchActions/extends/attribute/components/VerticalTabs/AttributesVerticalTab'),
                    icon: () => import('@Attributes/components/Icons/IconAttributes'),
                    props: {
                        ids: this.ids,
                        excludedIds: this.excludedIds,
                    },
                },
            ];
        },
    },
    methods: {
        ...mapActions('list', [
            'setDisabledElement',
            'removeDisabledElement',
        ]),
        onAddItem({
            item,
        }) {
            this.formItems.push(item);

            this.setDisabledElement({
                languageCode: item.languageCode,
                elementId: `${item.id}|${item.code}`,
                disabled: true,
            });
        },
        onRemoveItem(index) {
            const item = this.formItems[index];

            this.removeDisabledElement({
                languageCode: item.languageCode,
                elementId: `${item.id}|${item.code}`,
            });

            this.formItems.splice(index, 1);
        },
        onClose() {
            this.removeScopeData(this.scope);

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
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        &__form-section {
            display: flex;
            flex: 1;
            flex-direction: column;
            box-sizing: border-box;
        }

        &__form {
            display: flex;
            justify-content: center;
            padding: 48px;
        }
    }
</style>
