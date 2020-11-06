/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormListElementField
        :field-key="index"
        @remove="onRemove">
        <TranslationSelect
            :value="attribute"
            required
            label="Binding attribute"
            :error-messages="errorMessages"
            :size="smallSize"
            :options="filteredOptions"
            @input="onValueChange" />
    </FormListElementField>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import FormListElementField from '@UI/components/Form/Field/FormListElementField';
import TranslationSelect from '@UI/components/Select/TranslationSelect';

export default {
    name: 'ProductAttributeBindingField',
    components: {
        FormListElementField,
        TranslationSelect,
    },
    props: {
        index: {
            type: Number,
            required: true,
        },
        errorMessages: {
            type: String,
            default: '',
        },
        binding: {
            type: String,
            default: '',
        },
        bindings: {
            type: Array,
            default: () => [],
        },
        attributes: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        attribute() {
            return this.attributes.find(attribute => attribute.id === this.binding);
        },
        filteredOptions() {
            return this.attributes
                .filter(attribute => attribute.id === this.binding
                    || !this.bindings.some(id => id === attribute.id));
        },
    },
    methods: {
        onValueChange({
            id,
        }) {
            this.$emit('input', {
                index: this.index,
                value: id,
            });
        },
        onRemove() {
            this.$emit('remove', this.index);
        },
    },
};
</script>
