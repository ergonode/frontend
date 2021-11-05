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
                @remove-item="onRemoveOption">
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
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
        optionValues() {
            return Object.keys(this.options).map(key => ({
                fieldKey: key,
                ...this.options[key],
            }));
        },
    },
    methods: {
        ...mapActions('attribute', [
            'addAttributeOptionKey',
            'removeAttributeOptionKey',
            'updateAttributeOptionKey',
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

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'attribute-add-options',
                value: this.options,
            });
        },
        onRemoveOption(item) {
            this.removeAttributeOptionKey({
                index: item.fieldKey,
                id: item.id,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'attribute-add-options',
                value: this.options,
            });
        },
        onAddOptionKey() {
            this.addAttributeOptionKey(getUUID());

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'attribute-add-options',
                value: this.options,
            });
        },
        dataCyGenerator(key) {
            return `attribute-option-${key}`;
        },
    },
};
</script>
