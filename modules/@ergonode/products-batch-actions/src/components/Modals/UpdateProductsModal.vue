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
                <VerticalTabBar :items="verticalTabs">
                    <RemoveFormFieldDropZone />
                </VerticalTabBar>
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
                                    <AttributeFormField
                                        :item="item"
                                        :is-prefetching-data="fetchingAttributes[item.id]" />
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
import {
    get as getAttribute,
} from '@Attributes/services/attribute';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import RemoveFormFieldDropZone
    from '@Modules/@ergonode/products-batch-actions/src/components/DropZones/RemoveFormFieldDropZone';
import AttributeFormField
    from '@ProductsBatchActions/extends/attribute/components/Forms/Fields/AttributeFormField';
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
        RemoveFormFieldDropZone,
        AttributeFormField,
        VerticalFixedScroll,
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
            fetchingAttributes: {},
            attributes: {},
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
    beforeDestroy() {
        this.formItems.forEach((item) => {
            this.removeDisabledElement({
                languageCode: item.languageCode,
                elementId: `${item.id}|${item.code}`,
            });
        });
    },
    methods: {
        ...mapActions('list', [
            'setDisabledElement',
            'removeDisabledElement',
        ]),
        async onAddItem({
            item,
        }) {
            this.formItems.push(item);

            this.setDisabledElement({
                languageCode: item.languageCode,
                elementId: `${item.id}|${item.code}`,
                disabled: true,
            });

            if (typeof this.attributes[item.id] === 'undefined') {
                try {
                    this.fetchingAttributes = {
                        ...this.fetchingAttributes,
                        [item.id]: true,
                    };

                    this.attributes[item.id] = await getAttribute({
                        $axios: this.$axios,
                        id: item.id,
                    });

                    delete this.fetchingAttributes[item.id];

                    this.fetchingAttributes = {
                        ...this.fetchingAttributes,
                    };
                } catch (e) {
                    if (!this.app.$axios.isCancel(e)) {
                        this.$addAlert({
                            type: ALERT_TYPE.ERROR,
                            message: this.$t('@ProductsBatchActions.attribute._.getRequest'),
                        });
                    }
                }
            }
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
