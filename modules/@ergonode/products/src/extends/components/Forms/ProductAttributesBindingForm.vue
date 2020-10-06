/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :errors="errors"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormListSection
                :disabled="isDisabled"
                add-list-title="ADD BINDING ATTRIBUTE"
                @add="onAddRecord">
                <FormListSubsection v-if="bindings.length && selectAttributes.length">
                    <ProductAttributeBindingField
                        v-for="(binding, index) in bindings"
                        :key="index"
                        :index="index"
                        :error-messages="errors[`${binding}/${index}`]"
                        :binding="binding"
                        :bindings="bindings"
                        :attributes="selectAttributes"
                        @input="onValueChange"
                        @remove="onRemove" />
                </FormListSubsection>
            </FormListSection>
        </template>
    </Form>
</template>

<script>
import Form from '@Core/components/Form/Form';
import FormListSection from '@Core/components/Form/Section/FormListSection';
import FormListSubsection from '@Core/components/Form/Subsection/FormListSubsection';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import ProductAttributeBindingField from '@Products/extends/components/Forms/Field/ProductAttributeBindingField';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ProductAttributesBindingForm',
    components: {
        Form,
        FormListSection,
        FormListSubsection,
        ProductAttributeBindingField,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    props: {
        bindings: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        ...mapState('product', [
            'selectAttributes',
        ]),
        isDisabled() {
            return this.bindings.length === this.selectAttributes.length;
        },
    },
    methods: {
        onAddRecord() {
            const tmp = [
                ...this.bindings,
            ];

            tmp.push(null);

            this.$emit('input', tmp);
        },
        onValueChange({
            index, value,
        }) {
            const tmp = [
                ...this.bindings,
            ];

            tmp[index] = value;

            this.$emit('input', tmp);
        },
        onRemove(index) {
            const tmp = [
                ...this.bindings,
            ];

            tmp.splice(index, 1);

            this.$emit('input', tmp);
        },
    },
};
</script>
