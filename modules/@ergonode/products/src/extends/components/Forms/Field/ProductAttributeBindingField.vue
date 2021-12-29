/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormListElementField
        :field-key="index"
        @remove="onRemove">
        <Select
            :value="attribute"
            required
            :label="$t('@Products.productExtend.components.ProductAttributeBindingField.label')"
            :error-messages="errorMessages"
            :size="smallSize"
            :options="filteredOptions"
            option-key="key"
            option-value="value"
            @input="onValueChange" />
    </FormListElementField>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'ProductAttributeBindingField',
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
