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
        <FormListSubsection v-if="optionIndexes.length">
            <FormListElementField
                v-for="(fieldKey, i) in optionIndexes"
                :key="fieldKey"
                :field-key="fieldKey"
                :disabled="disabled"
                @remove="onRemoveOption">
                <TextField
                    :data-cy="dataCyGenerator(i)"
                    :value="options[fieldKey].key"
                    required
                    :size="smallSize"
                    :disabled="disabled"
                    :label="$t('@Attributes.attributeExtend.components.AttributeOptionKeyValues.optionLabel')"
                    :error-messages="errors[`option_${fieldKey}`]"
                    @input="value => onUpdateOptionKey({
                        key: fieldKey,
                        value,
                    })" />
            </FormListElementField>
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
        optionIndexes() {
            return Object.keys(this.options);
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
        onRemoveOption(fieldKey) {
            this.removeAttributeOptionKey({
                index: fieldKey,
                id: this.options[fieldKey].id,
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
