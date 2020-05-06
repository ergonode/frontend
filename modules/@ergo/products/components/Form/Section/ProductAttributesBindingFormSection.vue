/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormListSection
        :disabled="disabled"
        add-list-title="ADD BINDING ATTRIBUTE"
        @add="addBindingAttribute">
        <FormListSubsection>
            <ProductAttributeBindingField
                v-for="(attribute, index) in bindingAttributes"
                :key="index"
                :index="index"
                :attribute="attribute"
                :disabled="disabled" />
        </FormListSubsection>
    </FormListSection>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductAttributeBindingField from '@Products/components/Form/Field/ProductAttributeBindingField';
import FormListSection from '@Core/components/Form/Section/FormListSection';
import FormListSubsection from '@Core/components/Form/Subsection/FormListSubsection';

export default {
    name: 'ProductAttributesBindingFormSection',
    components: {
        FormListSection,
        FormListSubsection,
        ProductAttributeBindingField,
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('product', {
            bindingAttributes: state => state.bindingAttributes,
        }),
    },
    methods: {
        ...mapActions('product', [
            'addBindingAttribute',
        ]),
    },
};
</script>
