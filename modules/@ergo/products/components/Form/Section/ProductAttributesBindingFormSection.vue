/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormListSection
        :disabled="disabled || bindingAttributesIds.length === selectAttributes.length"
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
import { mapState, mapActions } from 'vuex';
import ProductAttributeBindingField from '@Products/components/Form/Field/ProductAttributeBindingField';
import FormListSection from '@Core/components/Form/Section/FormListSection';
import FormListSubsection from '@Core/components/Form/Subsection/FormListSubsection';

const getSelectAttributes = () => import('@Attributes/services/getSelectAttributes.service');

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
    data() {
        return {
            observer: null,
            selectAttributes: [],
        };
    },
    computed: {
        ...mapState('product', {
            bindingAttributesIds: state => state.bindingAttributesIds,
        }),
    },
    mounted() {
        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                getSelectAttributes().then(response => response.default({
                    $axios: this.$axios,
                    $store: this.$store,
                }).then((selectAttributes) => {
                    this.selectAttributes = selectAttributes;
                }));
                this.observer.disconnect();
            }
        });
        this.observer.observe(this.$el);
    },
    beforeDestroy() {
        this.observer.disconnect();
    },
    methods: {
        ...mapActions('product', [
            'addBindingAttribute',
        ]),
    },
};
</script>
