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
            solid
            required
            small
            :disabled="disabled"
            :options="attributes"
            @input="setBindingAttribute" />
    </FormListElementField>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FormListElementField from '@Core/components/Form/Field/FormListElementField';
import TranslationSelect from '@Core/components/Inputs/Select/TranslationSelect';

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
        attribute: {
            type: Object,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('product', {
            attributes: state => state.attributes,
        }),
    },
    methods: {
        ...mapActions('product', [
            'setBindingAttribute',
            'removeBindingAttribute',
        ]),
    },
};
</script>
