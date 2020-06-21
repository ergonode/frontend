/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormListSection
        :disabled="isDisabled"
        add-list-title="ADD BINDING ATTRIBUTE"
        @add="addBindingAttribute">
        <FormListSubsection v-if="selectAttributes.length">
            <ProductAttributeBindingField
                v-for="(attribute, index) in bindingAttributesIds"
                :key="index"
                :index="index"
                :attribute-id="attribute"
                :attributes="selectAttributes"
                :disabled="disabled" />
        </FormListSubsection>
    </FormListSection>
</template>

<script>
import FormListSection from '@Core/components/Form/Section/FormListSection';
import FormListSubsection from '@Core/components/Form/Subsection/FormListSubsection';
import ProductAttributeBindingField from '@Products/components/Form/Field/ProductAttributeBindingField';
import {
    mapActions,
    mapState,
} from 'vuex';

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
            bindingAttributesIds: state => state.bindingAttributesIds,
            selectAttributes: state => state.selectAttributes,
        }),
        isDisabled() {
            return this.disabled
                || this.bindingAttributesIds.length === this.selectAttributes.length;
        },
    },
    methods: {
        ...mapActions('product', [
            'addBindingAttribute',
        ]),
    },
};
</script>
