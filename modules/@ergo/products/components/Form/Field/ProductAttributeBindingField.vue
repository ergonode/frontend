/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormListElementField
        :field-key="index"
        :disabled="disabled"
        @remove="removeBindingAttribute">
        <TranslationSelect
            :value="attribute"
            required
            small
            :disabled="disabled"
            :options="filteredOptions"
            @input="onValueChange" />
    </FormListElementField>
</template>

<script>
import FormListElementField from '@Core/components/Form/Field/FormListElementField';
import TranslationSelect from '@Core/components/Inputs/Select/TranslationSelect';
import {
    mapActions,
    mapState,
} from 'vuex';

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
        attributeId: {
            type: String,
            default: '',
        },
        attributes: {
            type: Array,
            default: () => [],
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('product', {
            bindingAttributesIds: state => state.bindingAttributesIds,
        }),
        attribute() {
            return this.attributes.find(attribute => attribute.id === this.attributeId);
        },
        filteredOptions() {
            return this.attributes
                .filter(attribute => attribute.id === this.attributeId
                    || !this.bindingAttributesIds.some(id => id === attribute.id));
        },
    },
    methods: {
        ...mapActions('product', [
            'setBindingAttributeId',
            'removeBindingAttribute',
        ]),
        onValueChange(value) {
            this.setBindingAttributeId({
                id: value.id,
                index: this.index,
            });
        },
    },
};
</script>
