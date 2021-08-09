/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalGrid
        :title="title"
        @close="onClose">
        <template #body>
            <VerticalTabBar :items="verticalTabs">
                <RemoveFormFieldDropZone :scope="scope" />
            </VerticalTabBar>
            <div class="update-products-modal__form-section">
                <VerticalFixedScroll>
                    <div class="update-products-modal__form">
                        <DraggableForm
                            :title="$t('@ProductBatchActions.productBatchAction.components.UpdateProductsModal.draggableFormTitle')"
                            :width="424"
                            :scope="scope"
                            :items="formItems"
                            @add-item="onAddItem"
                            @remove-item="onRemoveItem">
                            <template #item="{ item }">
                                <AttributeFormField
                                    :is-prefetching-data="fetching[item.id]">
                                    <template #attribute>
                                        <Component
                                            v-if="attributes[item.id]"
                                            :is="components[item.type]"
                                            :value="values[`${item.id}|${item.languageCode}`]"
                                            :attribute="attributes[item.id]"
                                            :language-code="item.languageCode"
                                            :error-messages="scopeErrors[
                                                `${item.id}|${item.languageCode}`
                                            ]"
                                            @blur="onBlur"
                                            @input="onValueChange" />
                                    </template>
                                </AttributeFormField>
                            </template>
                        </DraggableForm>
                    </div>
                </VerticalFixedScroll>
                <UpdateProductsButton
                    :filter="filter"
                    :selected-rows-count="selectedRowsCount"
                    :drafts="values"
                    :change-values="changeValues"
                    @apply="onApplyProductsUpdateBatchAction" />
            </div>
        </template>
    </ModalGrid>
</template>

<script>
import {
    get as getAttribute,
} from '@Attributes/services';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import {
    removeObjectProperty,
} from '@Core/models/objectWrapper';
import {
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';
import UpdateProductsButton
    from '@ProductBatchActions/components/Buttons/UpdateProductsButton';
import RemoveFormFieldDropZone
    from '@ProductBatchActions/components/DropZones/RemoveFormFieldDropZone';
import AttributeFormField
    from '@ProductBatchActions/components/Forms/Fields/AttributeFormField';
import VerticalFixedScroll from '@UI/components/Layout/Scroll/VerticalFixedScroll';
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
    },
    mixins: [
        modalFeedbackMixin,
    ],
    props: {
        filter: {
            type: [
                Object,
                String,
            ],
            default: () => ({}),
        },
        selectedRowsCount: {
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
            verticalTabs: [],
        };
    },
    computed: {
        title() {
            return this.$t('@ProductBatchActions.productBatchAction.components.UpdateProductsModal.title', {
                info: this.selectedRowsCount,
            });
        },
    },
    async mounted() {
        const extendedVerticalTabs = await this.$getExtendMethod('@ProductBatchActions/components/Modals/UpdateProductsModal/verticalTabs', {
            $this: this,
            props: {
                filter: this.filter,
            },
        });

        extendedVerticalTabs.forEach((tabs) => {
            this.verticalTabs.push(...tabs);
        });
    },
    beforeDestroy() {
        this.formItems.forEach((item) => {
            this.removeDisabledScopeElement({
                languageCode: item.languageCode,
                elementId: `${item.id}|${item.code}`,
                scope: this.scope,
            });
        });

        this.removeScopeData(this.scope);
    },
    methods: {
        ...mapActions('list', [
            'setDisabledScopeElement',
            'removeDisabledScopeElement',
        ]),
        ...mapActions('attribute', [
            'validateAttributeValue',
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
        async onBlur({
            key,
            value,
            languageCode,
        }) {
            await this.validateAttributeValue({
                id: key,
                languageCode,
                value,
                onError: e => this.onValidateAttributeValueError({
                    errors: e.data.errors,
                    fieldKeys: {
                        value: `${key}|${languageCode}`,
                    },
                }),
            });
        },
        onValidateAttributeValueError({
            errors,
            fieldKeys,
        }) {
            this.onError({
                errors,
                fieldKeys,
                scope: this.scope,
            });
        },
        async onAddItem({
            index,
            item,
        }) {
            try {
                this.formItems.push(item);

                if (typeof this.attributes[item.id] === 'undefined') {
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
                }

                this.setDisabledScopeElement({
                    scope: this.scope,
                    disabledElement: {
                        languageCode: item.languageCode,
                        elementId: `${item.id}|${item.code}`,
                        disabled: true,
                    },
                });
            } catch (e) {
                if (!this.app.$axios.isCancel(e)) {
                    this.$addAlert({
                        type: ALERT_TYPE.ERROR,
                        message: this.$t('@ProductBatchActions.productBatchAction._.getRequest'),
                    });
                }

                this.formItems.splice(index, 1);
            }
        },
        onRemoveItem(item) {
            this.removeDisabledScopeElement({
                languageCode: item.languageCode,
                elementId: `${item.id}|${item.code}`,
                scope: this.scope,
            });

            this.values = removeObjectProperty(this.values, `${item.id}|${item.languageCode}`);
            this.formItems = this.formItems.filter(({
                id, languageCode,
            }) => !(languageCode === item.languageCode && id === item.id));
        },
        onApplyProductsUpdateBatchAction() {
            this.onApply();
            this.onClose();
        },
        onClose() {
            this.$emit('close');
        },
        async getAttributeComponent(type) {
            let component = null;

            try {
                const extendedSlots = this.$getExtendSlot('@ProductBatchActions/components/Forms/Fields');

                if (extendedSlots && typeof extendedSlots[type] === 'function') {
                    component = await extendedSlots[type]();
                } else {
                    const mappedType = capitalizeAndConcatenationArray(type.split('_'));

                    component = await import(`@ProductBatchActions/components/Forms/Fields/Attribute${mappedType}FormField`);
                }
            } catch (e) {
                component = await import('@ProductBatchActions/components/Forms/Fields/AttributeNotDefinedField');

                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: this.$t('@ProductBatchActions.productBatchAction.components.UpdateProductsModal.getComponent', {
                        info: type,
                    }),
                });
            } finally {
                this.components[type] = component.default;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .update-products-modal {
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
