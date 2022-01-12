/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :errors="errors"
        :change-values="changeValues"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <Paragraph :title="$t('@Products.productExtend.components.ProductAttributesBindingForm.paragraphInfo')" />
            <FormListSection
                :disabled="isDisabled"
                :add-list-title="$t('@Products.productExtend.components.ProductAttributesBindingForm.listTitle')"
                :add-list-tooltip="addAttributeBindingTooltip"
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
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import ProductAttributeBindingField from '@Products/extends/components/Forms/Field/ProductAttributeBindingField';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductAttributesBindingForm',
    components: {
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
        addAttributeBindingTooltip() {
            return this.isDisabled
                ? this.$t('@Products.productExtend.components.ProductAttributesBindingForm.listTittleTooltip')
                : '';
        },
        isDisabled() {
            return this.bindings.length === this.selectAttributes.length;
        },
    },
    methods: {
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
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

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'bidingAttributes',
                value: tmp,
            });

            this.$emit('input', tmp);
        },
        onRemove(index) {
            const tmp = [
                ...this.bindings,
            ];

            tmp.splice(index, 1);

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'bidingAttributes',
                value: tmp,
            });

            this.$emit('input', tmp);
        },
    },
};
</script>
