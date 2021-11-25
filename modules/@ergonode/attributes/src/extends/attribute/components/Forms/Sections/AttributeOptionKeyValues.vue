/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
                        :data-cy="dataCyGenerator(item.fieldKey)"
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
    insertValueAtIndex,
    removeValueAtIndex,
} from '@Core/models/arrayWrapper';
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
            'sortedOptions',
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
        optionValues() {
            return this.sortedOptions.map(key => ({
                fieldKey: key,
                ...this.options[key],
            }));
        },
    },
    mounted() {
        this.setSortedOptions(Object.keys(this.options));
    },
    methods: {
        ...mapActions('attribute', [
            'addAttributeOptionKey',
            'removeAttributeOptionKey',
            'updateAttributeOptionKey',
            'setOptionState',
            'setSortedOptions',
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
            const indexToRemove = this.sortedOptions.indexOf(fieldKey);
            const tmpOptions = removeValueAtIndex(this.sortedOptions, indexToRemove);

            this.removeAttributeOptionKey(fieldKey);
            this.setOptionState({
                key: fieldKey,
                type: OPTION_STATES.DELETE,
                value: id,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'attribute-remove-option',
                value: this.options,
            });
            this.setSortedOptions(tmpOptions);
        },
        onMoveItem({
            index, items,
        }) {
            const {
                fieldKey,
            } = items[index];

            this.setOptionState({
                key: fieldKey,
                type: OPTION_STATES.MOVE,
                value: index,
            });

            this.setSortedOptions(items.map(item => item.fieldKey));

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'attribute-move-options',
                value: this.options,
            });
        },
        onAddOptionKey() {
            const fieldKey = getUUID();
            const tmpOptions = insertValueAtIndex(
                this.sortedOptions,
                fieldKey,
                this.sortedOptions.length,
            );

            this.addAttributeOptionKey(fieldKey);
            this.setOptionState({
                key: fieldKey,
                type: OPTION_STATES.ADD,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'attribute-add-option',
                value: this.options,
            });
            this.setSortedOptions(tmpOptions);
        },
        dataCyGenerator(key) {
            return `attribute-option-${key}`;
        },
    },
};
</script>
