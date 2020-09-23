/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormListSection
        data-cy="attribute-add-options"
        :disabled="disabled"
        add-list-title="ADD OPTION KEY"
        @add="addOptionKey">
        <FormListSubsection v-if="optionIndexes.length">
            <FormListElementField
                v-for="(fieldKey, i) in optionIndexes"
                :key="fieldKey"
                :field-key="fieldKey"
                :disabled="disabled"
                @remove="removeAttribute">
                <TextField
                    :data-cy="dataCyGenerator(i)"
                    :value="options[fieldKey].key"
                    required
                    :size="smallSize"
                    :disabled="disabled"
                    label="Option code"
                    :error-messages="errorMessages[`option_${fieldKey}`]"
                    @input="value => updateAttributeOptionKey({
                        index: fieldKey,
                        id: options[fieldKey].id,
                        key: value,
                    })" />
            </FormListElementField>
        </FormListSubsection>
    </FormListSection>
</template>

<script>
import FormListElementField from '@Core/components/Form/Field/FormListElementField';
import FormListSection from '@Core/components/Form/Section/FormListSection';
import FormListSubsection from '@Core/components/Form/Subsection/FormListSubsection';
import TextField from '@Core/components/Inputs/TextField';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    getUUID,
} from '@Core/models/stringWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeOptionKeyValues',
    components: {
        FormListElementField,
        FormListSection,
        FormListSubsection,
        TextField,
    },
    props: {
        disabled: {
            type: Boolean,
            required: true,
        },
        errorMessages: {
            type: Object,
            default: () => ({}),
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
        ...mapActions('tab', [
            'addMultilingualOptionTranslation',
        ]),
        removeAttribute(fieldKey) {
            this.removeAttributeOptionKey({
                index: fieldKey,
                id: this.options[fieldKey].id,
            });
        },
        addOptionKey() {
            this.addAttributeOptionKey(getUUID());
        },
        dataCyGenerator(key) {
            return `attribute-option-${key}`;
        },
    },
};
</script>
