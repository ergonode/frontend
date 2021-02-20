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
                                        :is-prefetching-data="fetching[item.id]">
                                        <template #attribute>
                                            <Component
                                                :is="components[item.type]"
                                                :value="values[`${item.id}|${item.languageCode}`]"
                                                :attribute="attributes[item.id]"
                                                :language-code="item.languageCode"
                                                @input="onValueChange" />
                                        </template>
                                    </AttributeFormField>
                                </template>
                            </DraggableForm>
                        </div>
                    </VerticalFixedScroll>
                    <UpdateProductsButton
                        :drafts="values"
                        :change-values="changeValues" />
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
import {
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';
import UpdateProductsButton
    from '@ProductsBatchActions/components/Buttons/UpdateProductsButton';
import RemoveFormFieldDropZone
    from '@ProductsBatchActions/components/DropZones/RemoveFormFieldDropZone';
import AttributeFormField
    from '@ProductsBatchActions/components/Forms/Fields/AttributeFormField';
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
        UpdateProductsButton,
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
            fetching: {},
            attributes: {},
            components: {},
            values: {},
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
                    title: this.$t('@ProductsBatchActions.productBatchAction._.title'),
                    component: () => import('@ProductsBatchActions/components/VerticalTabs/AttributesVerticalTab'),
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

        this.removeScopeData(this.scope);
    },
    methods: {
        ...mapActions('list', [
            'setDisabledElement',
            'removeDisabledElement',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onValueChange({
            key,
            value,
            languageCode,
        }) {
            this.values = {
                ...this.values,
                [`${key}|${languageCode}`]: value,
            };

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: [
                    `${key}|${languageCode}`,
                ],
                value,
            });
        },
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
                    this.fetching = {
                        ...this.fetching,
                        [item.id]: true,
                    };

                    const requests = [
                        getAttribute({
                            $axios: this.$axios,
                            id: item.id,
                        }),
                    ];

                    if (typeof this.components[item.type] === 'undefined') {
                        requests.push(this.getAttributeComponent(item.type));
                    }

                    const [
                        attributeData,
                        attributeComponent,
                    ] = await Promise.all(requests);

                    this.attributes[item.id] = attributeData;

                    if (attributeComponent) {
                        this.components[item.type] = attributeComponent;
                    }

                    delete this.fetching[item.id];

                    this.fetching = {
                        ...this.fetching,
                    };
                } catch (e) {
                    if (!this.app.$axios.isCancel(e)) {
                        this.$addAlert({
                            type: ALERT_TYPE.ERROR,
                            message: this.$t('@ProductsBatchActions.productBatchAction._.getRequest'),
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
        async getAttributeComponent(type) {
            try {
                const extendedSlots = this.$getExtendSlot('@ProductsBatchActions/components/Forms/Fields');

                let component = null;

                if (extendedSlots && typeof extendedSlots[type] === 'function') {
                    component = await extendedSlots[type]();
                } else {
                    const mappedType = capitalizeAndConcatenationArray(type.split('_'));

                    component = await import(`@ProductsBatchActions/components/Forms/Fields/Attribute${mappedType}FormField`);
                }

                this.components[type] = component.default;
            } catch (e) {
                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: this.$t('@ProductsBatchActions.productBatchAction.components.UpdateProductsModal.getComponent', {
                        info: type,
                    }),
                });
            }
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
            position: relative;
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
