/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormListSection
        data-cy="attribute-add-options"
        :disabled="disabled"
        :add-list-title="$t('@Attributes.attributeExtend.components.AttributeOptionKeyValues.addOption')"
        @add="onAddOptionKey">
        <FormListSubsection v-if="optionValues.length">
            <DraggableForm
                :has-drop-placeholder="false"
                :scope="scope"
                :items="optionValues"
                option-key="id"
                @remove-item="onRemoveOption"
                @move-item="onMoveItem">
                <template #item="{ item }">
                    <TextField
                        :data-cy="dataCyGenerator(item.index)"
                        :value="item.key"
                        required
                        :size="smallSize"
                        :disabled="disabled"
                        :label="$t('@Attributes.attributeExtend.components.AttributeOptionKeyValues.optionLabel')"
                        :error-messages="errors[`option_${item.fieldKey}`]"
                        @input="value => onUpdateOptionKey({
                            key: item.fieldKey,
                            value,
                        })" />
                </template>
            </DraggableForm>
        </FormListSubsection>
    </FormListSection>
</template>

<script>
import {
    OPTION_STATES,
} from '@Attributes/defaults';
import {
    SIZE,
} from '@Core/defaults/theme';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import {
    getUUID,
} from '@Core/models/stringWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeOptionKeyValues',
    mixins: [
        formFeedbackMixin,
    ],
    props: {
        disabled: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        ...mapState('attribute', [
            'options',
            'optionsOrder',
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
        optionValues() {
            return this.optionsOrder.map((key, index) => ({
                fieldKey: key,
                index,
                ...this.options[key],
            }));
        },
    },
    methods: {
        ...mapActions('attribute', [
            'addAttributeOptionKey',
            'updateAttributeOptionKey',
            'setOptionState',
            '__setState',
        ]),
        onUpdateOptionKey({
            key,
            value,
        }) {
            this.updateAttributeOptionKey({
                index: key,
                id: this.options[key].id,
                key: value,
            });
            this.setOptionState({
                key,
                type: OPTION_STATES.EDIT,
                value,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'attribute-update-options',
                value: this.options,
            });
        },
        onRemoveOption({
            fieldKey, id,
        }) {
            this.__setState({
                key: 'optionsOrder',
                value: this.optionsOrder.filter(optionId => optionId !== fieldKey),
            });

            this.setOptionState({
                key: fieldKey,
                type: OPTION_STATES.DELETE,
                value: {
                    fieldKey,
                    id,
                },
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'attribute-remove-option',
                value: this.options,
            });
        },
        onMoveItem({
            index,
            items,
        }) {
            this.__setState({
                key: 'optionsOrder',
                value: items.map(item => item.fieldKey),
            });

            this.setOptionState({
                key: items[index].fieldKey,
                type: OPTION_STATES.MOVE,
                value: items[index].fieldKey,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'attribute-move-options',
                value: this.options,
            });
        },
        onAddOptionKey() {
            const fieldKey = getUUID();

            this.__setState({
                key: 'optionsOrder',
                value: [
                    ...this.optionsOrder,
                    fieldKey,
                ],
            });

            this.addAttributeOptionKey(fieldKey);
            this.setOptionState({
                key: fieldKey,
                type: OPTION_STATES.ADD,
                value: true,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'attribute-add-option',
                value: this.options,
            });
        },
        dataCyGenerator(key) {
            return `attribute-option-${key}`;
        },
    },
};
</script>
